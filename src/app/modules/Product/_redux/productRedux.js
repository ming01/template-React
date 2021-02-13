require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

//http://uat.siamsmile.co.th:9188/swagger/index.html
//https://json-to-js.com/
// action type บอกว่า Redux ตัวนี้ สามารถทำอะไรได้บ้าง
export const actionTypes = {
  // ADD_PLAYER: '[Add player] Action',
  SAVE_CURRENT_PRODUCTGROUP: "[SAVE_CURRENT_PRODUCTGROUP] Action",
  UPDATE_CURRENT_PRODUCTGROUP: "[UPDATE_CURRENT_PRODUCTGROUP] Action",
  RESET_PRODUCTGROUP: "[RESET_PRODUCTGROUP] Action",
  UPDATE_CURRENT_PRODUCT: "[UPDATE_CURRENT_PRODUCT] Action",
  RESET_PRODUCT: "[RESET_PRODUCT] Action",
};

// state ค่าที่ถูกเก็บไว้
const initialProdutGroupState = {
  currentPage: 0,
  currentProductGroupToAdd: {
    id: 0,
    name: "",
    isActive: true,
  },
};

// reducer แต่ละ Action จะไป update State อย่างไร
export const productgroupreducer = (
  state = initialProdutGroupState,
  action
) => {
  switch (action.type) {
    case actionTypes.SAVE_CURRENT_PRODUCTGROUP: {
      return { ...state, currentProductGroupToAdd: action.payload };
    }
    case actionTypes.UPDATE_CURRENT_PRODUCTGROUP: {
      return { ...state, currentProductGroupToAdd: action.payload };
    }
    case actionTypes.RESET_PRODUCTGROUP: {
      return {
        ...state,
        currentProductGroupToAdd:
          initialProdutGroupState.currentProductGroupToAdd,
        currentPage: 0,
      };
    }

    default:
      return state;
  }
};

const initialProdutState = {
  currentPage: 0,
  currentProductToAdd: {
    id: 0,
    name: "",
    price: 0,
    qty: 0,
    productGroupId: 0,
    isActive: true,
  },
};

// reducer แต่ละ Action จะไป update State อย่างไร
export const productreducer = (state = initialProdutState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENT_PRODUCT: {
      return { ...state, currentProductToAdd: action.payload };
    }
    case actionTypes.RESET_PRODUCT: {
      return {
        ...state,
        currentProductToAdd: initialProdutState.currentProductToAdd,
        currentPage: 0,
      };
    }

    default:
      return state;
  }
};

//action เอาไว้เรียกจากข้างนอก เพื่อเปลี่ยน state
export const actions = {
  saveProdutGroup: (payload) => ({
    type: actionTypes.SAVE_CURRENT_PRODUCTGROUP,
    payload,
  }),
  resetProductGroup: () => ({ type: actionTypes.RESET_PRODUCTGROUP }),
  //updateCurrentProductGroup
  updateCurrentProductGroup: (payload) => ({
    type: actionTypes.UPDATE_CURRENT_PRODUCTGROUP,
    payload,
  }),
  updateCurrentProduct: (payload) => ({
    type: actionTypes.UPDATE_CURRENT_PRODUCT,
    payload,
  }),
  resetProduct: () => ({ type: actionTypes.RESET_PRODUCT }),
};
