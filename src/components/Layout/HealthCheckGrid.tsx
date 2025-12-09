import { useState } from "react";
import { Grid, Button, CircularProgress } from "@mui/material";
import { checkApp, checkRedis, checkDb } from "../../api/healthcheck";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const SERVICES = {
  app: { label: "App", variant: "purple", request: checkApp },
  redis: { label: "Redis", variant: "mint", request: checkRedis },
  db: { label: "DB", variant: "blue", request: checkDb },
} as const;

type ServiceKey = keyof typeof SERVICES;

const STATUS = {
  OK: "OK",
  ERROR: "ERROR",
} as const;

const extractStatus = (result: unknown): string => {
  if (typeof result === "string") return result;

  if (result && typeof result === "object" && "status" in result) {
    return ((result as Record<string, unknown>).status as string) ?? STATUS.OK;
  }

  return STATUS.OK;
};

export const HealthCheckGrid = () => {
  const [loading, setLoading] = useState<Record<ServiceKey, boolean>>({
    app: false,
    redis: false,
    db: false,
  });

  const [status, setStatus] = useState<Record<ServiceKey, string>>({
    app: SERVICES.app.label,
    redis: SERVICES.redis.label,
    db: SERVICES.db.label,
  });

  const handleCheck = async (type: ServiceKey) => {
    const service = SERVICES[type];

    try {
      setLoading((s) => ({ ...s, [type]: true }));

      const result = await service.request();
      const statusValue = extractStatus(result);

      setStatus((s) => ({ ...s, [type]: statusValue }));
    } catch (err) {
      console.error(err);
      setStatus((s) => ({ ...s, [type]: STATUS.ERROR }));
    } finally {
      setLoading((s) => ({ ...s, [type]: false }));
    }

    await sleep(5000);

    setStatus((s) => ({ ...s, [type]: service.label }));
  };

  return (
    <Grid container spacing={2}>
      {Object.entries(SERVICES).map(([type, service]) => {
        const key = type as ServiceKey;
        return (
          <Grid key={key} size={{ xs: 12, sm: 6, md: "auto" }}>
            <Button
              size="md"
              variant={service.variant}
              fullWidth
              disabled={loading[key]}
              onClick={() => handleCheck(key)}
            >
              {loading[key] ? <CircularProgress size={20} /> : status[key]}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};
