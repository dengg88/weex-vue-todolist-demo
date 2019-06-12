export default function getEntryUrl(name) {
    if (weex.config.env.platform === "Web") {
        return './components/'+name+'.html'
    }else{
       let arr =weex.config.bundleUrl.split('/')
       arr =arr.pop()
       arr =arr.push(name+".js")
       return arr.join('/')
    }
}