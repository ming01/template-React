import axios from "axios";

import * as CONST from "../../../../Constants";

export const getSubDistrictDetail = async (subDistrictId) => {
  let result;
  await axios
    .get(`${CONST.API_URL}/Workshop/subdistrictdetail/${subDistrictId}`)
    .then((res) => {
      result = {
        districtId: res.data.data.districtId,
        districtName: res.data.data.districtName,
        postCode: res.data.data.postCode,
        provinceId: res.data.data.provinceId,
        provinceName: res.data.data.provinceName,
        subDistrictId: res.data.data.subDistrictId,
        subDistrictName: res.data.data.subDistrictName,
      };
    })
    .catch((err) => {
      alert(err.message);
    });
  return result;
};
