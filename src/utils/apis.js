import { fetch , post  } from './fetch'

export const apis={

   


    // POST /app/mckj/viceFacilitator/viceFacilitatorLogin 微信公众号 - 次级服务商登录
    facilitatorLogin(params){
	    return post('/app/mckj/viceFacilitator/viceFacilitatorLogin',params);
    },
    //GET /app/mckj/viceFacilitator/isTokenValid 判断token是否有效
    isTokenValid(params){
	  	return fetch('/app/mckj/viceFacilitator/isTokenValid',params);
    },
    // // GET /app/mckj/facilitator/tokenMethod/facilitatorConfirmSwitchAccount 微信公众号 - 服务商个人中心 - 确认切换账号
    // confirmSwitchAccount(params){
    //   return fetch('/app/mckj/facilitator/tokenMethod/facilitatorConfirmSwitchAccount',params);
    // },
     // GET /app/mckj/viceFacilitator/tokenMethod/viceFacilitatorQueryAccount 微信公众号 - 次级服务商个人中心 - 我的账户
    queryAccount(params){
      return fetch('/app/mckj/viceFacilitator/tokenMethod/viceFacilitatorQueryAccount',params);
    },
    // GET /app/mckj/viceFacilitator/tokenMethod/viceFacilitatorQueryHomeData 微信公众号 - 次级服务商首页数据展示
    queryHomeData(params){
      return fetch('/app/mckj/viceFacilitator/tokenMethod/viceFacilitatorQueryHomeData',params);
    },
    // GET /app/mckj/viceFacilitator/tokenMethod/viceFacilitatorQueryMyMerchant 微信公众号 - 次级服务商个人中心 - 我的商户列表
    queryMyMerchant(params){
      return fetch('/app/mckj/viceFacilitator/tokenMethod/viceFacilitatorQueryMyMerchant',params);
    },
    // GET /app/mckj/viceFacilitator/tokenMethod/viceFacilitatorQueryMerchantInformation 微信公众号 - 次级服务商个人中心 - 我的商户信息
    queryMyMerchantInformation(params){
      return fetch('/app/mckj/viceFacilitator/tokenMethod/viceFacilitatorQueryMerchantInformation',params);
    },
    // GET /app/mckj/viceFacilitator/tokenMethod/viceFacilitatorQueryPersonalCenter 微信公众号 - 次级服务商个人中心
    queryPersonalCenter(params){
      return fetch('/app/mckj/viceFacilitator/tokenMethod/viceFacilitatorQueryPersonalCenter',params);
    },
    // GET /app/mckj/viceFacilitator/tokenMethod/viceFacilitatorSignOut 微信公众号 - 次级服务商个人中心 - 退出登录
    signOut(params){
      return fetch('/app/mckj/viceFacilitator/tokenMethod/viceFacilitatorSignOut',params);
    },
    // // GET /app/mckj/facilitator/tokenMethod/facilitatorSwitchAccount 微信公众号 - 服务商个人中心 - 切换账号
    // switchAccount(params){
    //   return fetch('/app/mckj/facilitator/tokenMethod/facilitatorSwitchAccount',params);
    // },
    // GET /app/mckj/viceFacilitator/tokenMethod/viceFacilitatorUpdatePassword 微信公众号 - 次级服务商个人中心 - 密码重置
    updatePassword(params){
      return fetch('/app/mckj/viceFacilitator/tokenMethod/viceFacilitatorUpdatePassword',params);
    },
    // GET /app/mckj/viceFacilitator/tokenMethod/queryMerchantByViceFacilitatorIdApp 次级服务商 - 搜索商户 - app分页
    searchMerchant(params){
      return fetch('/app/mckj/viceFacilitator/tokenMethod/queryMerchantByViceFacilitatorIdApp',params);
    },
    // GET /app/mckj/viceFacilitator/tokenMethod/queryMerchantType 微信公众号 - 次级服务商个人中心 - 我的商户列表 - 获取商户类型
    queryMerchantType(params){
      return fetch('/app/mckj/viceFacilitator/tokenMethod/queryMerchantType',params);
    },
    // GET /app/mckj/viceFacilitator/tokenMethod/queryOrderStatisticsByViceFacilitator 次级服务商 - 交易统计
    queryOrderStatistics(params){
      return fetch('/app/mckj/viceFacilitator/tokenMethod/queryOrderStatisticsByViceFacilitator',params);
    },
    // GET /app/mckj/viceFacilitator/tokenMethod/queryOrderStreamByViceFacilitator 次级服务商 - 交易流水
    queryOrderStream(params){
      return fetch('/app/mckj/viceFacilitator/tokenMethod/queryOrderStreamByViceFacilitator',params);
    },
    // GET /app/mckj/viceFacilitator/tokenMethod/queryStreamType 交易流水 - 时间类型选择
    queryStreamType(params){
      return fetch('/app/mckj/viceFacilitator/tokenMethod/queryStreamType',params);
    },
    // GET /app/mckj/viceFacilitator/tokenMethod/queryTerminalStatusRes 次级服务商 - 设备状态与数量查询
    queryTerminalStatusRes(params){
      return fetch('/app/mckj/viceFacilitator/tokenMethod/queryTerminalStatusRes',params);
    },
    //GET /app/mckj/viceFacilitator/tokenMethod/queryTerminalsStatusResByVice 次级服务商 - 设备状态与数量查询 - 列表
    queryTerminalsStatusRes(params){
      return fetch('/app/mckj/viceFacilitator/tokenMethod/queryTerminalsStatusResByVice',params);
    },
    ///GET /manage/common/area/tokenMethod/getMerchantAreasByViceFacilitator 服务商 - 根据次级服务商拥有的商户查询所有地区
    getMerchantAreasByFacilitator(params){
      return fetch('/manage/common/area/tokenMethod/getMerchantAreasByViceFacilitator',params);
    },
}