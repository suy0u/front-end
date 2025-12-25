let socket: WebSocket | null = null;
let subscribers = 0;

type MessageHandler = (data: unknown) => void;

let handler: MessageHandler | null = null;
let reconnectTimer: number | null = null;

function buildWsUrl(token: string) {
  const base = String(import.meta.env.VITE_API_URL);
  const wsBase = base.replace(/^http/, "ws");
  return `${wsBase}/api/ws/notifications?token=${encodeURIComponent(token)}`;
}

export function connectNotificationsWS(
  token: string,
  onMessage: MessageHandler
) {
  subscribers += 1;
  handler = onMessage;

  if (
    socket &&
    (socket.readyState === WebSocket.CONNECTING ||
      socket.readyState === WebSocket.OPEN)
  ) {
    return;
  }

  if (reconnectTimer) {
    window.clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }

  socket = new WebSocket(buildWsUrl(token));

  socket.onopen = () => {
    console.log("[WS] notifications connected");
  };

  socket.onmessage = (event) => {
    if (!handler) {
      console.warn("[WS] handler is null");
      return;
    }
    try {
      handler(JSON.parse(event.data));
    } catch {
      handler({ message: event.data });
    }
  };

  socket.onerror = () => {
    console.warn("[WS] notifications error");
  };

  socket.onclose = () => {
    socket = null;

    if (subscribers > 0) {
      reconnectTimer = window.setTimeout(() => {
        connectNotificationsWS(token, onMessage);
      }, 1500);
    }
  };
}

export function disconnectNotificationsWS() {
  subscribers = Math.max(0, subscribers - 1);

  if (subscribers > 0) return;

  if (!socket) return;

  if (socket.readyState === WebSocket.CONNECTING) {
    const ws = socket;
    ws.onopen = () => {
      ws.close();
    };
    return;
  }

  socket.close();
  socket = null;
}
