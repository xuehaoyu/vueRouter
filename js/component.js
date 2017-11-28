var index = Vue.component("index",{
    template:`
    <div class="index">
        <Nav></Nav>
        <router-view ></router-view>
    </div>
    `
})
var indexCon = Vue.component("index",{
    template:`
    <div class="indexCon">
       <img src="img/yu.jpg" alt="">
    </div>
    `
})
var info = Vue.component("info",{
    template:`
    <div style="position: absolute;left: 0;top: 0;width: 100%">
        <Nav></Nav>
        <transition name="opacity" mode="out-in">
        <router-view></router-view>
        </transition>
    </div>
    `,
})
var infoCon = Vue.component("infoCon",{
    template:`
    <ul class="mui-table-view">
	    <li class="mui-table-view-cell mui-media">
	        <router-link to="/info/1" tag="a">
	         <img class="mui-media-object mui-pull-right" src="http://placehold.it/40x30">
	            <div class="mui-media-body">
	                幸福
	                <p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
	            </div>
            </router-link>
	    </li>
	    <li class="mui-table-view-cell mui-media">
	       <router-link to="/info/2" tag="a">
	            <img class="mui-media-object mui-pull-right" src="http://placehold.it/40x30">
	            <div class="mui-media-body">
	                木屋
	                <p class="mui-ellipsis">想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
	            </div>
	        </router-link>
	    </li>
	    <li class="mui-table-view-cell mui-media">
	        <router-link to="/info/3" tag="a">
	            <img class="mui-media-object mui-pull-right" src="http://placehold.it/40x30">
	            <div class="mui-media-body">
	                CBD
	                <p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
	            </div>
	        </router-link>
	    </li>
	</ul>
    `
})
var contents = Vue.component("contents",{
    template:`
    <div>
         <div>{{$route.params.id}}
         简介内容 
         </div>
    </div>    
    `
})
Vue.component("Nav",{
    template:`
    <div class="Nav">
         <router-link :to="item.url" v-for="(item,key) in navData" exact class="navLis" :key="key">{{item.title}}</router-link>
         <router-link to="/login" v-if="!islogin">登录</router-link>  
         <span class="loginName" v-else @click="show" >{{name}}
            <span class="loginout" v-show="isshow" @click="loginout">退出</span>
         </span> 
    </div>
    `,
    data(){
        return{
            navData:[
                {title:"首页",url:"/"},
                {title:"公司简介",url:"/info"},
                {title:"文档说明",url:"/dom"},
            ],
            islogin:false,
            name:"",
            isshow:false,
        }
    },
    created(){
       this.islogin =  this.get("login","name");
       this.name = this.get("login","name");
    },
    methods:{
        show(){
            this.isshow = !this.isshow;
        },
        loginout(){
            this.del("login");
            router.push("/");
        }
    }
})
var dom = Vue.component("dom",{
    template:`
 <div style="position: absolute;left: 0;top:0;width: 100%;"> 
      <Nav></Nav>
      <div style="position: absolute;left: 0;top:0;width: 100%;height:100vh;padding-top: 40px;">
            <router-view class="left" name="left"></router-view>
            <router-view class="right" name="right" ></router-view>
      </div>
</div>
    `,
    beforeRouteEnter(to,from,next) {
        next(function (vm) {
                if (!vm.get("login", "name")) {
                    router.push("/login");
                }
            }
        )
    }
})
var left = Vue.component("left",{
    template:`
        <div>
        <ul>
            <li><strong>Vue安装</strong>
                <ul style="margin-left: 20px">
                    <router-link to="#one" tag="li">Vue Devtools</router-link>
                    <router-link to="#two"  tag="li">直接 script 引入</router-link>
                    <router-link to="#three" tag="li">NPM</router-link><br>
                </ul>
            </li>
             <li><strong>介绍</strong>
                <ul style="margin-left: 20px">
                    <router-link to="#four" tag="li">Vue.js 是什么</router-link>
                    <router-link to="#five"  tag="li">声明式渲染</router-link>
                </ul>
            </li>
        </ul>
        </div>
    `,
    watch:{
        $route(){
            var hash = this.$route.hash.slice(1);
            var vm =this;
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            /*起始位置*/
            new TWEEN.Tween({ tweeningNumber: document.querySelector(".right").scrollTop })
                /*动画方式*/
                .easing(TWEEN.Easing.Quadratic.Out)
                /*终止位置*/
                .to({ tweeningNumber: document.querySelector("#"+hash).offsetTop-40}, 500)
                /*当值变化时*/
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.tweeningNumber.toFixed(0)
                })
                .start()
            animate()
        }
    }
})
var right = Vue.component("right",{
    template:`
    <div>
        <div class="floor" id="one">
            <h1>Vue Devtools</h1>
            <p>当使用 Vue 时，我们推荐同时在你的浏览器上安装 Vue Devtools，它允许你在一个更加友善的界面中审查和调试你的 Vue 应用</p>
        </div>
        <div class="floor" id="two">
            <h1>直接 script 引入</h1>
            <p>
            直接下载并用 script 标签引入，Vue 会被注册为一个全局变量。重要提示：在开发时请用开发版本，遇到常见错误它会给出友好的警告。
开发环境不要用最小压缩版，不然就失去了错误提示和警告!
            </p>
        </div>
        <div class="floor" id="three">
            <h1>NPM</h1>
            <p>
            在用 Vue.js 构建大型应用时推荐使用 NPM 安装，NPM 能很好地和诸如 Webpack 或 Browserify 模块打包器配合使用。Vue.js 也提供配套工具来开发单文件组件。
# 最新稳定版
$ npm install vue
</p>
        </div>
         <div class="floor" id="four">
            <h1>Vue.js 是什么</h1>
            <p>
            Vue.js (读音 /vjuː/，类似于 view) 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。
如果你是有经验的前端开发者，想知道 Vue.js 与其它库/框架的区别，查看对比其它框架。
            </p>
        </div>
         <div class="floor" id="five">
            <h1>声明式渲染</h1>
            <p>
            这里我们遇到点新东西。你看到的 v-bind 属性被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊属性。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。简言之，这里该指令的作用是：“将这个元素节点的 title 属性和 Vue 实例的 message 属性保持一致”。
            这里我们遇到点新东西。你看到的 v-bind 属性被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊属性。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。简言之，这里该指令的作用是：“将这个元素节点的 title 属性和 Vue 实例的 message 属性保持一致”。
            这里我们遇到点新东西。你看到的 v-bind 属性被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊属性。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。简言之，这里该指令的作用是：“将这个元素节点的 title 属性和 Vue 实例的 message 属性保持一致”。
            这里我们遇到点新东西。你看到的 v-bind 属性被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊属性。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。简言之，这里该指令的作用是：“将这个元素节点的 title 属性和 Vue 实例的 message 属性保持一致”。
            这里我们遇到点新东西。你看到的 v-bind 属性被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊属性。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。简言之，这里该指令的作用是：“将这个元素节点的 title 属性和 Vue 实例的 message 属性保持一致”。
            这里我们遇到点新东西。你看到的 v-bind 属性被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊属性。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。简言之，这里该指令的作用是：“将这个元素节点的 title 属性和 Vue 实例的 message 属性保持一致”。
            </p>
        </div>
    </div>
    `
})
var login =  Vue.component("login",{
    template:`
<div style="position: absolute;left: 0;top:0;width: 100%;">
    <header class="mui-bar mui-bar-nav">
     <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
			<h1 class="mui-title">登录</h1>
		</header>
		<div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='name' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="login">登录</button>
			</div>
		</div>
</div>
    `,
    data(){
        return{
            loginInfo:{},
        }
    },
    methods:{
        back(){
            router.push("/");
        },
        login(){
            this.loginInfo.name = document.querySelector("#name").value;
            this.save("login",this.loginInfo);
            var name = this.get("login","name");
            router.push("/dom");
        }
    }
})

