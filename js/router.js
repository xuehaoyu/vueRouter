var router = new VueRouter({
    linkActiveClass:"active",
    routes:[
        {path:"/",component:index,children:[
            {path:"",component:indexCon}
        ]},
        {path:"/info",component:info,children:[
            {path:"",component:infoCon},
            {path:"/info/:id",component:contents},
            ]
        },
        {path:"/dom",component:dom,children:[
            {path:"",components:{
                left:left,
                right:right,
            }
            }
        ]},
        {path:"/login",component:login},
        {path:"*",redirect:"/"},
    ]
})