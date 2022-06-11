import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'

// * 登录
export const loginApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`${ModuleTypeEnum.SYSTEM}/login`, data);
    return res;
  } catch(err) {
    httpErrorHandle();
  }
}

// * 新接口
export const newApi = async (data: object) => {
  try {
    const resonse = await http(RequestHttpEnum.POST)(`新接口的路劲/xxx/xxx`, data)
  } catch (error) {
    httpErrorHandle();
  }
}

// * 登出
export const logoutApi = async () => {
  try {
    const res = await http(RequestHttpEnum.GET)(`${ModuleTypeEnum.SYSTEM}/logout`);
    return res;
  } catch(err) {
    httpErrorHandle();
  }
}

// * 获取 oss 上传接口
export const ossUrlApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.GET)(`${ModuleTypeEnum.SYSTEM}/getOssInfo`, data);
    return res;
  } catch(err) {
    httpErrorHandle();
  }
}