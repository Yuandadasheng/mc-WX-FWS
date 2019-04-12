import { apis } from './apis'

/*存储SessionStorage*/
export const setSession = (name,content)=>{
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    sessionStorage.setItem(name, content);
}
/*获取SessionStorage*/
export const getSession  = (name)=>{
    if (!name) return;
    return sessionStorage.getItem(name);
}
/*从 sessionStorage 删除保存的数据*/
export const removeSession  = (name)=>{
    if (!name) return;
    sessionStorage.removeItem(name);
}
/*清除SessionStorage*/
export const clearSession  = ()=>{
    sessionStorage.clear();
}

/*存储localStorage*/
export const setLocal = (name,content)=>{
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    localStorage.setItem(name, content);
}
/*获取localStorage*/
export const getLocal  = (name)=>{
    if (!name) return;
    return localStorage.getItem(name);
}

/* 判断token */
export const isTokenValid= (props)=>{
    let token = getSession('accountToken')
    if(!token){
        props.history.push({ pathname : `/`});
        return ;
    }  
    let data={
        token 
    }
    apis.isTokenValid(data)
        .then(
            res=>{
                if(res.code !== 1){
                    props.history.push({ pathname : `/`});
                }
            }
        )
}