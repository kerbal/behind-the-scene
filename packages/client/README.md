## Front-end Guideline

**Folder structure**
- **assets**: public resource
- **components**: common, reusable component (button, modal, ...)
- **modules**: views in UI can be divided into modules, which contains
  - **components**
  - **router**
  - **store**

**Create a new module**
To create a new module, follow these steps:
- Create a folder in `@/modules`, which contains `components`, `router`, `store`
- Register the module's router in `@/router`, don't forget to add `namespaced: true` to module's store
```ts
import Vue from 'vue';
import VueRouter from 'vue-router';

// import your module's router
import A from '@/modules/A/router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
});

// add your module's router to app router
router.addRoutes(A);

export default router;
```
- Add the module's store in `@/store`
```ts
import Vue from 'vue';
import Vuex from 'vuex';

// import module's store
import A from '@/modules/A/store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // register module's store
    A,
  },
});
```