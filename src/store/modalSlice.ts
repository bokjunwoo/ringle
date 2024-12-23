import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 모달 타입을 상수로 관리
export const MODAL_TYPES = {
  CREATE_SCHEDULE: 'CREATE_SCHEDULE',
  VIEW_SCHEDULE: 'VIEW_SCHEDULE',
} as const;

type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];

type ModalData = {
  [MODAL_TYPES.VIEW_SCHEDULE]: Schedule;
};

interface ModalInfo<T extends ModalType> {
  isOpen: boolean;
  data?: T extends keyof ModalData ? ModalData[T] : never;
}

interface ModalState {
  activeModals: {
    [K in ModalType]: ModalInfo<K>;
  };
}

const initialState: ModalState = {
  activeModals: {
    [MODAL_TYPES.CREATE_SCHEDULE]: {
      isOpen: false,
    },
    [MODAL_TYPES.VIEW_SCHEDULE]: {
      isOpen: false,
    },
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openCreateScheduleModal(state) {
      state.activeModals[MODAL_TYPES.CREATE_SCHEDULE].isOpen = true;
    },
    openViewScheduleModal(
      state,
      action: PayloadAction<{
        type: typeof MODAL_TYPES.VIEW_SCHEDULE;
        data: ModalData[typeof MODAL_TYPES.VIEW_SCHEDULE];
      }>,
    ) {
      state.activeModals[MODAL_TYPES.VIEW_SCHEDULE] = {
        isOpen: true,
        data: action.payload.data,
      };
    },
    closeModal(state, action: PayloadAction<ModalType>) {
      const type = action.payload;
      state.activeModals[type] = {
        isOpen: false,
        data: undefined,
      };
    },
  },
});

export const { openCreateScheduleModal, openViewScheduleModal, closeModal } =
  modalSlice.actions;
export default modalSlice.reducer;
