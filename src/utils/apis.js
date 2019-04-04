import { fetch , post  } from './fetch'

export const apis={

    //测试 /applets/zfb/user/getHomePageSlideshow
    // getHomePageSlideshow(params){
	// 	return fetch('/applets/zfb/user/getHomePageSlideshow',params);
    // },


    // POST /app/mckj/facilitator/facilitatorLogin 微信公众号 - 服务商登录
    facilitatorLogin(params){
	    return post('/app/mckj/facilitator/facilitatorLogin',params);
    },
    //GET/app/mckj/facilitator/isTokenValid 判断token是否有效
    isTokenValid(params){
	  	return fetch('/app/mckj/facilitator/isTokenValid',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/facilitatorConfirmSwitchAccount 微信公众号 - 服务商个人中心 - 确认切换账号
    confirmSwitchAccount(params){
      return fetch('/app/mckj/facilitator/tokenMethod/facilitatorConfirmSwitchAccount',params);
    },
     // GET /app/mckj/facilitator/tokenMethod/facilitatorQueryAccount 微信公众号 - 服务商个人中心 - 我的账户
    queryAccount(params){
      return fetch('/app/mckj/facilitator/tokenMethod/facilitatorQueryAccount',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/facilitatorQueryHomeData 微信公众号 - 服务商首页数据展示
    queryHomeData(params){
      return fetch('/app/mckj/facilitator/tokenMethod/facilitatorQueryHomeData',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/facilitatorQueryMyMerchant 微信公众号 - 服务商个人中心 - 我的商户列表
    queryMyMerchant(params){
      return fetch('/app/mckj/facilitator/tokenMethod/facilitatorQueryMyMerchant',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/facilitatorQueryMyMerchantInformation 微信公众号 - 服务商个人中心 - 我的商户信息
    queryMyMerchantInformation(params){
      return fetch('/app/mckj/facilitator/tokenMethod/facilitatorQueryMyMerchantInformation',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/facilitatorQueryPersonalCenter 微信公众号 - 服务商个人中心
    queryPersonalCenter(params){
      return fetch('/app/mckj/facilitator/tokenMethod/facilitatorQueryPersonalCenter',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/facilitatorSignOut 微信公众号 - 服务商个人中心 - 退出登录
    signOut(params){
      return fetch('/app/mckj/facilitator/tokenMethod/facilitatorSignOut',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/facilitatorSwitchAccount 微信公众号 - 服务商个人中心 - 切换账号
    switchAccount(params){
      return fetch('/app/mckj/facilitator/tokenMethod/facilitatorSwitchAccount',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/facilitatorUpdatePassword 微信公众号 - 服务商个人中心 - 密码重置
    updatePassword(params){
      return fetch('/app/mckj/facilitator/tokenMethod/facilitatorUpdatePassword',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/queryMerchantByFacilitatorIdApp 服务商 - 搜索商户 - app分页
    searchMerchant(params){
      return fetch('/app/mckj/facilitator/tokenMethod/queryMerchantByFacilitatorIdApp',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/queryMerchantType 微信公众号 - 服务商个人中心 - 我的商户列表 - 获取商户类型
    queryMerchantType(params){
      return fetch('/app/mckj/facilitator/tokenMethod/queryMerchantType',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/queryOrderStatisticsByFacilitator 服务商 - 交易统计
    queryOrderStatistics(params){
      return fetch('/app/mckj/facilitator/tokenMethod/queryOrderStatisticsByFacilitator',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/queryOrderStreamByFacilitator 服务商 - 交易流水
    queryOrderStream(params){
      return fetch('/app/mckj/facilitator/tokenMethod/queryOrderStreamByFacilitator',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/queryStreamType 交易流水 - 时间类型选择
    queryStreamType(params){
      return fetch('/app/mckj/facilitator/tokenMethod/queryStreamType',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/queryTerminalStatusRes 服务商 - 设备状态与数量查询
    queryTerminalStatusRes(params){
      return fetch('/app/mckj/facilitator/tokenMethod/queryTerminalStatusRes',params);
    },
    // GET /app/mckj/facilitator/tokenMethod/queryTerminalsStatusRes 服务商 - 设备状态与数量查询 - 列表
    queryTerminalsStatusRes(params){
      return fetch('/app/mckj/facilitator/tokenMethod/queryTerminalsStatusRes',params);
    },
}