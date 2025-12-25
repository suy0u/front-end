// import { createSlice } from "@reduxjs/toolkit";

// interface UiState {
//   notificationsModalOpen: boolean;
// }

// const initialState: UiState = {
//   notificationsModalOpen: false,
// };

// const uiSlice = createSlice({
//   name: "ui",
//   initialState,
//   reducers: {
//     openNotificationsModal(state) {
//       state.notificationsModalOpen = true;
//     },
//     closeNotificationsModal(state) {
//       state.notificationsModalOpen = false;
//     },
//   },
// });

// export const { openNotificationsModal, closeNotificationsModal } =
//   uiSlice.actions;

// export default uiSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ListModalType } from "../../types/common";
import type { MembershipState } from "../slices/membershipSlice";

interface ModalPayload {
  companyId?: string;
  isOwner?: boolean;
  membership?: MembershipState;
}

interface UiState {
  activeModal: ListModalType | null;
  modalPayload: ModalPayload | null;
}

const initialState: UiState = {
  activeModal: null,
  modalPayload: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{
        type: ListModalType;
        payload?: ModalPayload;
      }>
    ) {
      state.activeModal = action.payload.type;
      state.modalPayload = action.payload.payload ?? null;
    },
    closeModal(state) {
      state.activeModal = null;
      state.modalPayload = null;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
