import{r as D,f as M,z as q,o as r,c,h as o,x as n,a as e,m as F,w as G,s as L,F as H,k as w,t as y,j as K,u as W,p as B,d as E,q as N,e as Q,i as J}from"./index-C3q2fZvX.js";import{_ as P}from"./_plugin-vue_export-helper-DlAUqK2U.js";const Z={class:"login"},ee=e("h1",null,"Login",-1),te={__name:"Login",setup(p){const V=D(""),x=D(""),A=async()=>{await q.login(V.value,x.value)};return M(async()=>{await q.init()}),(T,l)=>(r(),c("div",Z,[ee,o(e("input",{"onUpdate:modelValue":l[0]||(l[0]=u=>V.value=u),placeholder:"Email"},null,512),[[n,V.value]]),o(e("input",{"onUpdate:modelValue":l[1]||(l[1]=u=>x.value=u),type:"password",placeholder:"Password"},null,512),[[n,x.value]]),e("button",{onClick:A},"Login")]))}},v=p=>(B("data-v-179eb40d"),p=p(),E(),p),oe={class:"form-container"},le=v(()=>e("h2",null,"Добавить курс",-1)),ne={class:"main-content"},se={class:"form-group"},ae=v(()=>e("label",{for:"title"},"Название:",-1)),ie={class:"form-group"},de=v(()=>e("label",{for:"level"},"Уровень обучения:",-1)),ue=["value"],re={key:0},ce={class:"form-group"},pe=v(()=>e("label",{for:"grantingRights"},"Предоставление права:",-1)),_e={class:"form-group"},me=v(()=>e("label",{for:"qualification"},"Квалификация:",-1)),he={class:"form-group"},ve=v(()=>e("label",{for:"direction"},"Направление:",-1)),$e=["value"],be={class:"form-group"},ge=v(()=>e("label",{for:"description"},"Описание:",-1)),fe={class:"form-group"},ye=v(()=>e("label",{for:"stages"},"Этапы работы:",-1)),Ue=v(()=>e("button",{type:"submit",class:"submit-button"},"Добавить курс",-1)),Ve={class:"side-panel"},Ce={class:"form-header"},ke=["onClick"],He=v(()=>e("label",null,"Название формы:",-1)),we=["onUpdate:modelValue"],xe=v(()=>e("label",null,"Количество часов:",-1)),Se=["onUpdate:modelValue"],Te=v(()=>e("label",null,"Продолжительность:",-1)),Ae=["onUpdate:modelValue"],Oe=v(()=>e("label",null,"Стоимость:",-1)),De=["onUpdate:modelValue"],Le=["onClick"],Ne={class:"form-header"},Pe=["onClick"],Re=v(()=>e("label",null,"Вид обучения:",-1)),qe=["onUpdate:modelValue"],Fe=v(()=>e("label",null,"Общее количество часов:",-1)),We=["onUpdate:modelValue"],Be=v(()=>e("label",null,"Часы индивидуальные:",-1)),Ee=["onUpdate:modelValue"],Me=v(()=>e("label",null,"Часы групповые:",-1)),je=["onUpdate:modelValue"],ze=v(()=>e("label",null,"Продолжительность:",-1)),Ie=["onUpdate:modelValue"],Ge=v(()=>e("label",null,"Стоимость:",-1)),Je=["onUpdate:modelValue"],Ke={class:"schedule-panel"},Qe=v(()=>e("h2",null,"Добавить расписание",-1)),Xe={class:"form-header"},Ye=["onClick"],Ze=v(()=>e("label",null,"Форма:",-1)),et=["onUpdate:modelValue"],tt=v(()=>e("label",null,"Тип:",-1)),ot=["onUpdate:modelValue"],lt=v(()=>e("label",null,"Дата начала:",-1)),nt=["onUpdate:modelValue"],st=v(()=>e("label",null,"Количество занятий:",-1)),at=["onUpdate:modelValue"],it=v(()=>e("label",null,"Время:",-1)),dt=["onUpdate:modelValue"],ut=v(()=>e("label",null,"Местоположение:",-1)),rt=["onUpdate:modelValue"],ct=v(()=>e("label",null,"Преподаватели:",-1)),pt=["onUpdate:modelValue"],_t={__name:"AddCourse",props:{adding:Boolean},emits:["update:adding"],setup(p,{emit:V}){const x=V,A=["Профессиональная подготовка","Общеобразовательные курсы","Повышение квалификации"],T=["Менеджмент","Бухгалтерские","Компьютерные","Дизайн","Бизнес","Иностранные языки"],l=D({title:"",level:"",grantingRights:"",qualification:"",direction:"",description:"",stages:"",forms:[],schedules:[]}),u=()=>{l.value={title:"",level:"",direction:"",description:"",stages:"",forms:[],schedules:[]}},g=F(()=>l.value.level),a=()=>{l.value.title&&l.value.direction&&l.value.level&&l.value.description&&x("update:adding",!1)},U=()=>{x("update:adding",!1)},i=()=>{l.value.forms.push({name:"",hours:"",duration:"",price:"",category:"course",learningTypes:[]})},S=O=>{l.value.forms.splice(O,1)},h=O=>{l.value.forms[O].learningTypes.push({name:"",totalHours:"",individualHours:"",groupHours:"",duration:"",category:"course",price:""})},R=(O,f)=>{l.value.forms[O].learningTypes.splice(f,1)},j=()=>{l.value.schedules.push({form:"",type:"",startDate:"",numOfClasses:"",time:"",location:"",teachers:"",category:"course"})},z=O=>{l.value.schedules.splice(O,1)},I=async()=>{if(l.value.title&&l.value.direction&&l.value.description){if(!Array.isArray(l.value.forms)||!Array.isArray(l.value.schedules)){console.error('Поле "forms" и "schedules" должны быть массивами.');return}const O=W();try{const f=await O.addCourse({title:l.value.title,level:l.value.level,grantingRights:l.value.grantingRights,qualification:l.value.qualification,direction:l.value.direction,description:l.value.description,stages:l.value.stages}),s=l.value.forms.map(_=>O.addFormOfCourse({title:l.value.title,form:_.name,hours:_.hours,length:_.duration,cost:parseInt(_.price,10),category:"course"}));await Promise.all(s);const m=l.value.forms.flatMap(_=>_.learningTypes.map(d=>O.addTypeOfCourse({title:l.value.title,form:_.name,type:d.name,hours:d.totalHours,individualHours:d.individualHours,groupHours:d.groupHours,length:d.duration,cost:parseInt(d.price,10),category:"course"})));await Promise.all(m);const t=l.value.schedules.map(_=>O.addSchedule({title:l.value.title,form:_.form,type:_.type,startDate:_.startDate,numOfClasses:parseInt(_.numOfClasses,10),time:_.time,location:_.location,teachers:_.teachers,category:"course"}));await Promise.all(t),u()}catch(f){console.error("Ошибка при добавлении курса, форм обучения или расписания:",f)}a()}else alert("Пожалуйста, заполните все обязательные поля.")};return(O,f)=>(r(),c("div",oe,[e("button",{onClick:f[0]||(f[0]=s=>U()),class:"exit-button"},"Выйти"),le,e("div",ne,[e("form",{onSubmit:G(I,["prevent"]),class:"course-form"},[e("div",se,[ae,o(e("input",{"onUpdate:modelValue":f[1]||(f[1]=s=>l.value.title=s),id:"title",type:"text",placeholder:"Введите название курса"},null,512),[[n,l.value.title]])]),e("div",ie,[de,o(e("select",{"onUpdate:modelValue":f[2]||(f[2]=s=>l.value.level=s),id:"level"},[(r(),c(H,null,w(A,s=>e("option",{key:s,value:s},y(s),9,ue)),64))],512),[[L,l.value.level]])]),g.value==="Профессиональная подготовка"?(r(),c("div",re,[e("div",ce,[pe,o(e("textarea",{"onUpdate:modelValue":f[3]||(f[3]=s=>l.value.grantingRights=s),id:"grantingRights",placeholder:"Диплом предоставляет право на"},null,512),[[n,l.value.grantingRights]])]),e("div",_e,[me,o(e("textarea",{"onUpdate:modelValue":f[4]||(f[4]=s=>l.value.qualification=s),id:"qualification",placeholder:"Введите квалификацию"},null,512),[[n,l.value.qualification]])])])):K("",!0),e("div",he,[ve,o(e("select",{"onUpdate:modelValue":f[5]||(f[5]=s=>l.value.direction=s),id:"direction"},[(r(),c(H,null,w(T,s=>e("option",{key:s,value:s},y(s),9,$e)),64))],512),[[L,l.value.direction]])]),e("div",be,[ge,o(e("textarea",{"onUpdate:modelValue":f[6]||(f[6]=s=>l.value.description=s),id:"description",placeholder:"Введите описание курса"},null,512),[[n,l.value.description]])]),e("div",fe,[ye,o(e("input",{"onUpdate:modelValue":f[7]||(f[7]=s=>l.value.stages=s),id:"stages",type:"text",placeholder:"Введите этапы работы"},null,512),[[n,l.value.stages]])]),e("button",{type:"button",onClick:i},"Добавить форму обучения"),Ue],32),e("div",Ve,[(r(!0),c(H,null,w(l.value.forms,(s,m)=>(r(),c("div",{key:m,class:"form-group"},[e("div",Ce,[e("h3",null,"Форма "+y(m+1),1),e("button",{class:"delete-button",onClick:t=>S(m)},"Удалить",8,ke)]),He,o(e("input",{"onUpdate:modelValue":t=>s.name=t,type:"text",placeholder:"Введите название формы (очная/заочная)"},null,8,we),[[n,s.name]]),xe,o(e("input",{"onUpdate:modelValue":t=>s.hours=t,type:"text",placeholder:"Введите количество часов"},null,8,Se),[[n,s.hours]]),Te,o(e("input",{"onUpdate:modelValue":t=>s.duration=t,type:"text",placeholder:"Введите продолжительность"},null,8,Ae),[[n,s.duration]]),Oe,o(e("input",{"onUpdate:modelValue":t=>s.price=t,type:"number",placeholder:"Введите стоимость"},null,8,De),[[n,s.price]]),e("button",{type:"button",onClick:t=>h(m)},"Добавить вид обучения",8,Le),(r(!0),c(H,null,w(s.learningTypes,(t,_)=>(r(),c("div",{key:_,class:"learning-type"},[e("div",Ne,[e("h4",null,"Вид "+y(_+1),1),e("button",{class:"delete-button",onClick:d=>R(m,_)},"Удалить",8,Pe)]),Re,o(e("input",{"onUpdate:modelValue":d=>t.name=d,type:"text",placeholder:"Введите вид обучения (группа/минигруппа)"},null,8,qe),[[n,t.name]]),Fe,o(e("input",{"onUpdate:modelValue":d=>t.totalHours=d,type:"text",placeholder:"Введите общее количество часов"},null,8,We),[[n,t.totalHours]]),Be,o(e("input",{"onUpdate:modelValue":d=>t.individualHours=d,type:"number",placeholder:"Введите количество часов индивидуальных занятий"},null,8,Ee),[[n,t.individualHours]]),Me,o(e("input",{"onUpdate:modelValue":d=>t.groupHours=d,type:"number",placeholder:"Введите количество часов групповых занятий"},null,8,je),[[n,t.groupHours]]),ze,o(e("input",{"onUpdate:modelValue":d=>t.duration=d,type:"text",placeholder:"Введите продолжительность"},null,8,Ie),[[n,t.duration]]),Ge,o(e("input",{"onUpdate:modelValue":d=>t.price=d,type:"number",placeholder:"Введите стоимость"},null,8,Je),[[n,t.price]])]))),128))]))),128))]),e("div",Ke,[Qe,e("button",{type:"button",onClick:j},"Добавить расписание"),(r(!0),c(H,null,w(l.value.schedules,(s,m)=>(r(),c("div",{key:m,class:"schedule-item"},[e("div",Xe,[e("h4",null,"Расписание "+y(m+1),1),e("button",{class:"delete-button",onClick:t=>z(m)},"Удалить",8,Ye)]),Ze,o(e("input",{"onUpdate:modelValue":t=>s.form=t,type:"text",placeholder:"Введите форму (очная/заочная)"},null,8,et),[[n,s.form]]),tt,o(e("input",{"onUpdate:modelValue":t=>s.type=t,type:"text",placeholder:"Введите тип (в группе/в минигруппе)"},null,8,ot),[[n,s.type]]),lt,o(e("input",{"onUpdate:modelValue":t=>s.startDate=t,type:"date",placeholder:"Введите дату начала"},null,8,nt),[[n,s.startDate]]),st,o(e("input",{"onUpdate:modelValue":t=>s.numOfClasses=t,type:"number",placeholder:"Введите количество занятий"},null,8,at),[[n,s.numOfClasses]]),it,o(e("input",{"onUpdate:modelValue":t=>s.time=t,type:"text",placeholder:"Введите время занятий"},null,8,dt),[[n,s.time]]),ut,o(e("input",{"onUpdate:modelValue":t=>s.location=t,type:"text",placeholder:"Введите местоположение"},null,8,rt),[[n,s.location]]),ct,o(e("input",{"onUpdate:modelValue":t=>s.teachers=t,type:"text",placeholder:"Введите имена преподавателей"},null,8,pt),[[n,s.teachers]])]))),128))])])]))}},mt=P(_t,[["__scopeId","data-v-179eb40d"]]),$=p=>(B("data-v-f73dc471"),p=p(),E(),p),ht={class:"form-container"},vt=$(()=>e("h2",null,"Редактировать курс",-1)),$t={class:"main-content"},bt={class:"form-group"},gt=$(()=>e("label",{for:"title"},"Название:",-1)),ft={class:"form-group"},yt=$(()=>e("label",{for:"level"},"Уровень обучения:",-1)),Ut=["value"],Vt={key:0},Ct={class:"form-group"},kt=$(()=>e("label",{for:"grantingRights"},"Предоставление права:",-1)),Ht={class:"form-group"},wt=$(()=>e("label",{for:"qualification"},"Квалификация:",-1)),xt={class:"form-group"},St=$(()=>e("label",{for:"direction"},"Направление:",-1)),Tt=["value"],At={class:"form-group"},Ot=$(()=>e("label",{for:"description"},"Описание:",-1)),Dt={class:"form-group"},Lt=$(()=>e("label",{for:"stages"},"Этапы работы:",-1)),Nt={class:"form-header"},Pt=["onClick"],Rt=$(()=>e("label",null,"Название формы:",-1)),qt=["onUpdate:modelValue"],Ft=$(()=>e("label",null,"Количество часов:",-1)),Wt=["onUpdate:modelValue"],Bt=$(()=>e("label",null,"Продолжительность:",-1)),Et=["onUpdate:modelValue"],Mt=$(()=>e("label",null,"Стоимость:",-1)),jt=["onUpdate:modelValue"],zt=["onClick"],It={class:"form-header"},Gt=["onClick"],Jt=$(()=>e("label",null,"Вид обучения:",-1)),Kt=["onUpdate:modelValue"],Qt=$(()=>e("label",null,"Общее количество часов:",-1)),Xt=["onUpdate:modelValue"],Yt=$(()=>e("label",null,"Часы индивидуальные:",-1)),Zt=["onUpdate:modelValue"],eo=$(()=>e("label",null,"Часы групповые:",-1)),to=["onUpdate:modelValue"],oo=$(()=>e("label",null,"Продолжительность:",-1)),lo=["onUpdate:modelValue"],no=$(()=>e("label",null,"Стоимость:",-1)),so=["onUpdate:modelValue"],ao={class:"schedule-panel"},io=$(()=>e("h3",null,"Редактировать расписание",-1)),uo={class:"form-header"},ro=["onClick"],co=$(()=>e("label",null,"Форма:",-1)),po=["onUpdate:modelValue"],_o=$(()=>e("label",null,"Тип:",-1)),mo=["onUpdate:modelValue"],ho=$(()=>e("label",null,"Дата начала:",-1)),vo=["onUpdate:modelValue"],$o=$(()=>e("label",null,"Количество занятий:",-1)),bo=["onUpdate:modelValue"],go=$(()=>e("label",null,"Время:",-1)),fo=["onUpdate:modelValue"],yo=$(()=>e("label",null,"Местоположение:",-1)),Uo=["onUpdate:modelValue"],Vo=$(()=>e("label",null,"Преподаватели:",-1)),Co=["onUpdate:modelValue"],ko=$(()=>e("button",{type:"submit",class:"submit-button"},"Сохранить изменения",-1)),Ho={__name:"EditCourse",props:{course:Object,editing:Boolean},emits:["update:editing","course-updated"],setup(p,{emit:V}){const x=p,A=V,T=()=>{A("update:editing",!1)},l=async()=>{try{A("course-updated",x.course),A("update:editing",!1)}catch(u){console.error("Ошибка при обновлении курса:",u)}};return(u,g)=>(r(),c("div",ht,[e("button",{onClick:T,class:"exit-button"},"Выйти"),vt,e("div",$t,[e("form",{onSubmit:G(l,["prevent"]),class:"course-form"},[e("div",bt,[gt,o(e("input",{"onUpdate:modelValue":g[0]||(g[0]=a=>p.course.title=a),id:"title",type:"text",placeholder:"Введите название курса"},null,512),[[n,p.course.title]])]),e("div",ft,[yt,o(e("select",{"onUpdate:modelValue":g[1]||(g[1]=a=>p.course.level=a),id:"level"},[(r(!0),c(H,null,w(u.levels,a=>(r(),c("option",{key:a,value:a},y(a),9,Ut))),128))],512),[[L,p.course.level]])]),p.course.level==="Профессиональная подготовка"?(r(),c("div",Vt,[e("div",Ct,[kt,o(e("textarea",{"onUpdate:modelValue":g[2]||(g[2]=a=>p.course.grantingRights=a),id:"grantingRights",placeholder:"Диплом предоставляет право на"},null,512),[[n,p.course.grantingRights]])]),e("div",Ht,[wt,o(e("textarea",{"onUpdate:modelValue":g[3]||(g[3]=a=>p.course.qualification=a),id:"qualification",placeholder:"Введите квалификацию"},null,512),[[n,p.course.qualification]])])])):K("",!0),e("div",xt,[St,o(e("select",{"onUpdate:modelValue":g[4]||(g[4]=a=>p.course.direction=a),id:"direction"},[(r(!0),c(H,null,w(u.directions,a=>(r(),c("option",{key:a,value:a},y(a),9,Tt))),128))],512),[[L,p.course.direction]])]),e("div",At,[Ot,o(e("textarea",{"onUpdate:modelValue":g[5]||(g[5]=a=>p.course.description=a),id:"description",placeholder:"Введите описание курса"},null,512),[[n,p.course.description]])]),e("div",Dt,[Lt,o(e("input",{"onUpdate:modelValue":g[6]||(g[6]=a=>p.course.stages=a),id:"stages",type:"text",placeholder:"Введите этапы работы"},null,512),[[n,p.course.stages]])]),(r(!0),c(H,null,w(p.course.forms,(a,U)=>(r(),c("div",{class:"form-group",key:U},[e("div",Nt,[e("h3",null,"Форма "+y(U+1),1),e("button",{onClick:i=>u.removeForm(U),class:"delete-button"},"Удалить",8,Pt)]),Rt,o(e("input",{"onUpdate:modelValue":i=>a.name=i,type:"text",placeholder:"Введите название формы (очная/заочная)"},null,8,qt),[[n,a.name]]),Ft,o(e("input",{"onUpdate:modelValue":i=>a.hours=i,type:"text",placeholder:"Введите количество часов"},null,8,Wt),[[n,a.hours]]),Bt,o(e("input",{"onUpdate:modelValue":i=>a.duration=i,type:"text",placeholder:"Введите продолжительность"},null,8,Et),[[n,a.duration]]),Mt,o(e("input",{"onUpdate:modelValue":i=>a.price=i,type:"number",placeholder:"Введите стоимость"},null,8,jt),[[n,a.price]]),e("button",{onClick:i=>u.addLearningType(U),type:"button"},"Добавить вид обучения",8,zt),(r(!0),c(H,null,w(a.learningTypes,(i,S)=>(r(),c("div",{key:S,class:"learning-type"},[e("div",It,[e("h4",null,"Вид "+y(S+1),1),e("button",{onClick:h=>u.removeLearningType(U,S),class:"delete-button"},"Удалить",8,Gt)]),Jt,o(e("input",{"onUpdate:modelValue":h=>i.name=h,type:"text",placeholder:"Введите вид обучения (группа/минигруппа)"},null,8,Kt),[[n,i.name]]),Qt,o(e("input",{"onUpdate:modelValue":h=>i.totalHours=h,type:"text",placeholder:"Введите общее количество часов"},null,8,Xt),[[n,i.totalHours]]),Yt,o(e("input",{"onUpdate:modelValue":h=>i.individualHours=h,type:"number",placeholder:"Введите количество индивидуальных часов"},null,8,Zt),[[n,i.individualHours]]),eo,o(e("input",{"onUpdate:modelValue":h=>i.groupHours=h,type:"number",placeholder:"Введите количество групповых часов"},null,8,to),[[n,i.groupHours]]),oo,o(e("input",{"onUpdate:modelValue":h=>i.duration=h,type:"text",placeholder:"Введите продолжительность"},null,8,lo),[[n,i.duration]]),no,o(e("input",{"onUpdate:modelValue":h=>i.price=h,type:"number",placeholder:"Введите стоимость"},null,8,so),[[n,i.price]])]))),128))]))),128)),e("div",ao,[io,e("button",{onClick:g[7]||(g[7]=(...a)=>u.addSchedule&&u.addSchedule(...a)),type:"button"},"Добавить расписание"),(r(!0),c(H,null,w(p.course.schedules,(a,U)=>(r(),c("div",{key:U,class:"schedule-item"},[e("div",uo,[e("h4",null,"Расписание "+y(U+1),1),e("button",{onClick:i=>u.removeSchedule(U),class:"delete-button"},"Удалить",8,ro)]),co,o(e("input",{"onUpdate:modelValue":i=>a.form=i,type:"text",placeholder:"Введите форму (очная/заочная)"},null,8,po),[[n,a.form]]),_o,o(e("input",{"onUpdate:modelValue":i=>a.type=i,type:"text",placeholder:"Введите тип (группа/минигруппа)"},null,8,mo),[[n,a.type]]),ho,o(e("input",{"onUpdate:modelValue":i=>a.startDate=i,type:"date"},null,8,vo),[[n,a.startDate]]),$o,o(e("input",{"onUpdate:modelValue":i=>a.numOfClasses=i,type:"number",placeholder:"Введите количество занятий"},null,8,bo),[[n,a.numOfClasses]]),go,o(e("input",{"onUpdate:modelValue":i=>a.time=i,type:"text",placeholder:"Введите время занятий"},null,8,fo),[[n,a.time]]),yo,o(e("input",{"onUpdate:modelValue":i=>a.location=i,type:"text",placeholder:"Введите местоположение"},null,8,Uo),[[n,a.location]]),Vo,o(e("input",{"onUpdate:modelValue":i=>a.teachers=i,type:"text",placeholder:"Введите имена преподавателей"},null,8,Co),[[n,a.teachers]])]))),128))]),ko],32)])]))}},wo=P(Ho,[["__scopeId","data-v-f73dc471"]]),X=p=>(B("data-v-bcb64f58"),p=p(),E(),p),xo={class:"addingCourses"},So=X(()=>e("h1",null,"Курсы",-1)),To={key:0},Ao={key:1},Oo={key:2},Do={key:0},Lo=X(()=>e("b",null,"Этапы:",-1)),No=["onClick"],Po=["onClick"],Ro={key:1},qo={__name:"ActiveElementsCourses",setup(p){const V=W(),x=F(()=>V.Курсы),A=D(null),T=D(!1),l=D(!1);M(async()=>{await V.fetchCourses()});const u=()=>{l.value=!0},g=i=>{A.value={...i},T.value=!0},a=async i=>{await V.handleCourseUpdated(i)},U=async i=>{confirm("Вы уверены, что хотите удалить этот курс?")&&await V.deleteCourse(i)};return(i,S)=>(r(),c("div",null,[e("div",xo,[So,e("button",{class:"button",onClick:S[0]||(S[0]=h=>u())},"Добавить")]),l.value?(r(),c("div",To,[N(mt,{adding:l.value,"onUpdate:adding":S[1]||(S[1]=h=>l.value=h)},null,8,["adding"])])):T.value?(r(),c("div",Ao,[N(wo,{course:A.value,editing:T.value,"onUpdate:editing":S[2]||(S[2]=h=>T.value=h),onCourseUpdated:a},null,8,["course","editing"])])):(r(),c("div",Oo,[x.value.length?(r(),c("ul",Do,[(r(!0),c(H,null,w(x.value,h=>(r(),c("li",{key:h.$id},[e("h2",null,y(h.title),1),e("p",null,y(h.description),1),e("p",null,[Lo,Q(" "+y(h.stages),1)]),e("button",{onClick:R=>g(h)},"Редактировать",8,No),e("button",{onClick:R=>U(h.$id)},"Удалить",8,Po)]))),128))])):(r(),c("p",Ro,"Нет курсов для отображения."))]))]))}},Fo=P(qo,[["__scopeId","data-v-bcb64f58"]]),b=p=>(B("data-v-5fc7b022"),p=p(),E(),p),Wo={class:"form-container"},Bo=b(()=>e("h2",null,"Добавить вебинар/семинар",-1)),Eo={class:"main-content"},Mo={class:"form-group"},jo=b(()=>e("label",{for:"webOrSem"},"Вебинар/Семинар:",-1)),zo=["value"],Io={class:"form-group"},Go=b(()=>e("label",{for:"title"},"Название:",-1)),Jo={class:"form-group"},Ko=b(()=>e("label",{for:"direction"},"Направление:",-1)),Qo=["value"],Xo={class:"form-group"},Yo=b(()=>e("label",{for:"description"},"Описание:",-1)),Zo={class:"form-group"},el=b(()=>e("label",{for:"stages"},"Этапы работы:",-1)),tl={class:"form-group"},ol=b(()=>e("label",{for:"teacherName"},"Преподаватель:",-1)),ll=["value"],nl=b(()=>e("button",{type:"submit",class:"submit-button"},"Добавить вебинар/семинар",-1)),sl={class:"side-panel"},al={class:"form-header"},il=["onClick"],dl=b(()=>e("label",null,"Название формы:",-1)),ul=["onUpdate:modelValue"],rl=b(()=>e("label",null,"Количество часов:",-1)),cl=["onUpdate:modelValue"],pl=b(()=>e("label",null,"Продолжительность:",-1)),_l=["onUpdate:modelValue"],ml=b(()=>e("label",null,"Стоимость:",-1)),hl=["onUpdate:modelValue"],vl=["onClick"],$l={class:"form-header"},bl=["onClick"],gl=b(()=>e("label",null,"Вид обучения:",-1)),fl=["onUpdate:modelValue"],yl=b(()=>e("label",null,"Общее количество часов:",-1)),Ul=["onUpdate:modelValue"],Vl=b(()=>e("label",null,"Часы индивидуальные:",-1)),Cl=["onUpdate:modelValue"],kl=b(()=>e("label",null,"Часы групповые:",-1)),Hl=["onUpdate:modelValue"],wl=b(()=>e("label",null,"Продолжительность:",-1)),xl=["onUpdate:modelValue"],Sl=b(()=>e("label",null,"Стоимость:",-1)),Tl=["onUpdate:modelValue"],Al={class:"schedule-panel"},Ol=b(()=>e("h2",null,"Добавить расписание",-1)),Dl={class:"form-header"},Ll=["onClick"],Nl=b(()=>e("label",null,"Форма:",-1)),Pl=["onUpdate:modelValue"],Rl=b(()=>e("label",null,"Тип:",-1)),ql=["onUpdate:modelValue"],Fl=b(()=>e("label",null,"Дата начала:",-1)),Wl=["onUpdate:modelValue"],Bl=b(()=>e("label",null,"Количество занятий:",-1)),El=["onUpdate:modelValue"],Ml=b(()=>e("label",null,"Время:",-1)),jl=["onUpdate:modelValue"],zl=b(()=>e("label",null,"Местоположение:",-1)),Il=["onUpdate:modelValue"],Gl=b(()=>e("label",null,"Преподаватели:",-1)),Jl=["onUpdate:modelValue"],Kl={__name:"AddWebinar",props:{adding:Boolean},emits:["update:adding"],setup(p,{emit:V}){const x=V,A=["Менеджмент","Бухгалтерские","Компьютерные","Дизайн","Бизнес","Иностранные языки"],T=["Вебинар","Семинар"],l=D(""),u=D({title:"",direction:"",description:"",stages:"",isWebinar:!0,teacherName:"",teacherDescription:"",forms:[],schedules:[]}),g=W();M(async()=>{await g.fetchTeachers()});const a=F(()=>g.Преподаватели),U=F(()=>Array.isArray(a.value)?a.value.find(s=>s.name===u.value.teacherName):(console.error("teachers is not an array:",a.value),null)),i=()=>{u.value={title:"",direction:"",description:"",stages:"",isWebinar:!0,teacherName:"",teacherDescription:"",forms:[],schedules:[]}},S=()=>{x("update:adding",!1)},h=()=>{u.value.forms.push({name:"",hours:"",duration:"",price:"",category:l.value==="Вебинар"?"Вебинар":"Семинар",learningTypes:[]})},R=s=>{u.value.forms.splice(s,1)},j=s=>{u.value.forms[s].learningTypes.push({name:"",totalHours:"",individualHours:"",groupHours:"",duration:"",category:l.value==="Вебинар"?"Вебинар":"Семинар",price:""})},z=(s,m)=>{u.value.forms[s].learningTypes.splice(m,1)},I=()=>{u.value.schedules.push({form:"",type:"",startDate:"",numOfClasses:"",time:"",location:"",teachers:"",category:l.value==="Вебинар"?"Вебинар":"Семинар"})},O=s=>{u.value.schedules.splice(s,1)},f=async()=>{if(u.value.title&&u.value.direction&&u.value.description){if(!Array.isArray(u.value.forms)||!Array.isArray(u.value.schedules)){console.error('Поле "forms" и "schedules" должны быть массивами.');return}const s=W();try{const m=await s.addWebinar({title:u.value.title,direction:u.value.direction,description:u.value.description,stages:u.value.stages,isWebinar:l.value==="Вебинар",teacherName:u.value.teacherName,teacherDescription:U.value?U.value.description:""}),t=u.value.forms.map(C=>s.addFormOfCourse({title:u.value.title,form:C.name,hours:C.hours,length:C.duration,cost:parseInt(C.price,10),category:l.value==="Вебинар"?"Вебинар":"Семинар"}));await Promise.all(t);const _=u.value.forms.flatMap(C=>C.learningTypes.map(k=>s.addTypeOfCourse({title:u.value.title,form:C.name,type:k.name,hours:k.totalHours,individualHours:k.individualHours,groupHours:k.groupHours,length:k.duration,cost:parseInt(k.price,10),category:l.value==="Вебинар"?"Вебинар":"Семинар"})));await Promise.all(_);const d=u.value.schedules.map(C=>s.addSchedule({title:u.value.title,form:C.form,type:C.type,startDate:C.startDate,numOfClasses:parseInt(C.numOfClasses,10),time:C.time,location:C.location,teachers:C.teachers,category:l.value==="Вебинар"?"Вебинар":"Семинар"}));await Promise.all(d),i()}catch(m){console.error("Ошибка при добавлении вебинара, форм обучения или расписания:",m)}S()}else alert("Пожалуйста, заполните все обязательные поля.")};return(s,m)=>(r(),c("div",Wo,[e("button",{onClick:S,class:"exit-button"},"Выйти"),Bo,e("div",Eo,[e("form",{onSubmit:G(f,["prevent"]),class:"course-form"},[e("div",Mo,[jo,o(e("select",{"onUpdate:modelValue":m[0]||(m[0]=t=>l.value=t),id:"webOrSem"},[(r(),c(H,null,w(T,t=>e("option",{key:t,value:t},y(t),9,zo)),64))],512),[[L,l.value]])]),e("div",Io,[Go,o(e("input",{"onUpdate:modelValue":m[1]||(m[1]=t=>u.value.title=t),id:"title",type:"text",placeholder:"Введите название"},null,512),[[n,u.value.title]])]),e("div",Jo,[Ko,o(e("select",{"onUpdate:modelValue":m[2]||(m[2]=t=>u.value.direction=t),id:"direction"},[(r(),c(H,null,w(A,t=>e("option",{key:t,value:t},y(t),9,Qo)),64))],512),[[L,u.value.direction]])]),e("div",Xo,[Yo,o(e("textarea",{"onUpdate:modelValue":m[3]||(m[3]=t=>u.value.description=t),id:"description",placeholder:"Введите описание"},null,512),[[n,u.value.description]])]),e("div",Zo,[el,o(e("input",{"onUpdate:modelValue":m[4]||(m[4]=t=>u.value.stages=t),id:"stages",type:"text",placeholder:"Введите этапы работы"},null,512),[[n,u.value.stages]])]),e("div",tl,[ol,o(e("select",{"onUpdate:modelValue":m[5]||(m[5]=t=>u.value.teacherName=t),id:"teacherName"},[(r(!0),c(H,null,w(a.value,t=>(r(),c("option",{key:t.name,value:t.name},y(t.name),9,ll))),128))],512),[[L,u.value.teacherName]])]),e("button",{type:"button",onClick:h},"Добавить форму обучения"),nl],32),e("div",sl,[(r(!0),c(H,null,w(u.value.forms,(t,_)=>(r(),c("div",{key:_,class:"form-group"},[e("div",al,[e("h3",null,"Форма "+y(_+1),1),e("button",{class:"delete-button",onClick:d=>R(_)},"Удалить",8,il)]),dl,o(e("input",{"onUpdate:modelValue":d=>t.name=d,type:"text",placeholder:"Введите название формы (очная/заочная)"},null,8,ul),[[n,t.name]]),rl,o(e("input",{"onUpdate:modelValue":d=>t.hours=d,type:"text",placeholder:"Введите количество часов"},null,8,cl),[[n,t.hours]]),pl,o(e("input",{"onUpdate:modelValue":d=>t.duration=d,type:"text",placeholder:"Введите продолжительность"},null,8,_l),[[n,t.duration]]),ml,o(e("input",{"onUpdate:modelValue":d=>t.price=d,type:"number",placeholder:"Введите стоимость"},null,8,hl),[[n,t.price]]),e("button",{type:"button",onClick:d=>j(_)},"Добавить вид обучения",8,vl),(r(!0),c(H,null,w(t.learningTypes,(d,C)=>(r(),c("div",{key:C,class:"learning-type"},[e("div",$l,[e("h4",null,"Вид "+y(C+1),1),e("button",{class:"delete-button",onClick:k=>z(_,C)},"Удалить",8,bl)]),gl,o(e("input",{"onUpdate:modelValue":k=>d.name=k,type:"text",placeholder:"Введите вид обучения (группа/минигруппа)"},null,8,fl),[[n,d.name]]),yl,o(e("input",{"onUpdate:modelValue":k=>d.totalHours=k,type:"text",placeholder:"Введите общее количество часов"},null,8,Ul),[[n,d.totalHours]]),Vl,o(e("input",{"onUpdate:modelValue":k=>d.individualHours=k,type:"number",placeholder:"Введите количество часов индивидуальных занятий"},null,8,Cl),[[n,d.individualHours]]),kl,o(e("input",{"onUpdate:modelValue":k=>d.groupHours=k,type:"number",placeholder:"Введите количество часов групповых занятий"},null,8,Hl),[[n,d.groupHours]]),wl,o(e("input",{"onUpdate:modelValue":k=>d.duration=k,type:"text",placeholder:"Введите продолжительность"},null,8,xl),[[n,d.duration]]),Sl,o(e("input",{"onUpdate:modelValue":k=>d.price=k,type:"number",placeholder:"Введите стоимость"},null,8,Tl),[[n,d.price]])]))),128))]))),128))]),e("div",Al,[Ol,e("button",{type:"button",onClick:I},"Добавить расписание"),(r(!0),c(H,null,w(u.value.schedules,(t,_)=>(r(),c("div",{key:_,class:"schedule-item"},[e("div",Dl,[e("h4",null,"Расписание "+y(_+1),1),e("button",{class:"delete-button",onClick:d=>O(_)},"Удалить",8,Ll)]),Nl,o(e("input",{"onUpdate:modelValue":d=>t.form=d,type:"text",placeholder:"Введите форму (очная/заочная)"},null,8,Pl),[[n,t.form]]),Rl,o(e("input",{"onUpdate:modelValue":d=>t.type=d,type:"text",placeholder:"Введите тип (в группе/в минигруппе)"},null,8,ql),[[n,t.type]]),Fl,o(e("input",{"onUpdate:modelValue":d=>t.startDate=d,type:"date",placeholder:"Введите дату начала"},null,8,Wl),[[n,t.startDate]]),Bl,o(e("input",{"onUpdate:modelValue":d=>t.numOfClasses=d,type:"number",placeholder:"Введите количество занятий"},null,8,El),[[n,t.numOfClasses]]),Ml,o(e("input",{"onUpdate:modelValue":d=>t.time=d,type:"text",placeholder:"Введите время занятий"},null,8,jl),[[n,t.time]]),zl,o(e("input",{"onUpdate:modelValue":d=>t.location=d,type:"text",placeholder:"Введите местоположение"},null,8,Il),[[n,t.location]]),Gl,o(e("input",{"onUpdate:modelValue":d=>t.teachers=d,type:"text",placeholder:"Введите имена преподавателей"},null,8,Jl),[[n,t.teachers]])]))),128))])])]))}},Ql=P(Kl,[["__scopeId","data-v-5fc7b022"]]),Y=p=>(B("data-v-69516d5e"),p=p(),E(),p),Xl={class:"addingCourses"},Yl=Y(()=>e("h1",null,"Вебинары/Семинары",-1)),Zl={key:0},en={key:1},tn={key:0},on={key:0},ln={key:1},nn=Y(()=>e("b",null,"Этапы:",-1)),sn=["onClick"],an=["onClick"],dn={key:1},un={__name:"ActiveElementsWebinars",setup(p){const V=W(),x=F(()=>V.ВебинарыСеминары),A=D(null),T=D(!1);M(async()=>{await V.fetchWebinars()});const l=a=>{A.value={...a},console.log("Editing webinar:",a)},u=()=>{T.value=!0},g=async a=>{confirm("Вы уверены, что хотите удалить этот курс?")&&await V.deleteWebinar(a)};return(a,U)=>(r(),c("div",null,[e("div",Xl,[Yl,e("button",{class:"button",onClick:U[0]||(U[0]=i=>u())},"Добавить")]),T.value?(r(),c("div",Zl,[N(Ql,{adding:T.value,"onUpdate:adding":U[1]||(U[1]=i=>T.value=i)},null,8,["adding"])])):(r(),c("div",en,[x.value.length?(r(),c("ul",tn,[(r(!0),c(H,null,w(x.value,i=>(r(),c("li",{key:i.$id},[i.isWebinar?(r(),c("div",on," Вебинар ")):(r(),c("div",ln," Семинар ")),e("h2",null,y(i.title),1),e("p",null,y(i.description),1),e("p",null,[nn,Q(" "+y(i.stages),1)]),e("button",{onClick:S=>l(i)},"Редактировать",8,sn),e("button",{onClick:S=>g(i.$id)},"Удалить",8,an)]))),128))])):(r(),c("p",dn,"Нет вебинаров и семинаров для отображения."))]))]))}},rn=P(un,[["__scopeId","data-v-69516d5e"]]),cn={class:"container"},pn={key:0},_n={key:1},mn={class:"user-info"},hn={class:"information-page"},vn={__name:"Admin",setup(p){const V=async()=>{await q.logout()};return(x,A)=>(r(),c("div",cn,[J(q).current?(r(),c("div",_n,[e("div",mn,[e("p",null,"Logged in as "+y(J(q).current.email),1),e("button",{onClick:V,class:"logout-button"},"Logout")]),e("div",hn,[N(Fo,{class:"active-elements"}),N(rn,{class:"active-elements"})])])):(r(),c("div",pn,[N(te,{class:"login-component"})]))]))}},gn=P(vn,[["__scopeId","data-v-8720e5c2"]]);export{gn as default};
