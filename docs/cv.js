const App = {
  template: `
      <language @lang="setLang" class="print:hidden" :hints="cv.hints"/>
      <cv>
        <cv-title :me="cv.me"></cv-title>
        <cv-subtitle :me="cv.me"></cv-subtitle>
        <div class="flex grow">
          <cv-column-left :me="cv.me" :skills="cv.skills" :knowledge="cv.knowledge" :certificates="cv.certificates" :languages="cv.languages"/>
          <cv-column-right :experience="cv.experience" :education="cv.education" :project="cv.project" :interests="cv.interests" :rights="cv.rights"/>
        </div>
      </cv>
    `,
  data() {
    return {
      lang: localStorage.getItem('cv_language') || 'en'
    };
  },
  methods: {
    setLang(lang) {
      this.lang = lang;
      localStorage.setItem('cv_language', lang);
    }
  },
  computed: {
    cv() {
      return this.lang === 'pl' ? CV.pl : CV.en;
    }
  }
};
const app = Vue.createApp(App);

const formatYearMonth = function (value) {
  if (!value) return null;
  const month = ('0' + value.getMonth()).slice(-2);
  const year = ('000' + value.getFullYear()).slice(-4);
  return `${year}.${month}`;
};
app.component('cv-column-left', {
  template: `
    <div class="flex flex-col bg-lightgray basis-2/6 p-2 gap-2 text-right">
          <avatar/>
          <skill-section :label="me.label">
            <span class="font-bold">{{me.phone}}</span>
            <span>{{me.email}}</span>
          </skill-section>
          <skill-section :label="skills.label">
            <skill v-for="s,index in skills.list" :key="index" :label="s.label" :value="s.value"/>
          </skill-section>
          <skill-section :label="knowledge.label">
            <span v-for="k,index in knowledge.list" :key="index">{{k}}</span>
          </skill-section>
          <skill-section :label="certificates.label">
            <span v-for="c,index in certificates.list" :key="index">{{c}}</span>
          </skill-section>
          <skill-section :label="languages.label">
            <skill v-for="l,index in languages.list" :key="index" :label="l.label" :value="l.value"/>
          </skill-section>
        </div>
  `,
  props: ['me', 'skills', 'knowledge', 'certificates', 'languages']
});
app.component('cv-column-right', {
  template: `
    <div class="flex flex-col basis-4/6 px-2">
          <skill-section :label="experience.label">
            <experience v-for="e,index in experience.list" :key="index" :exp="e" :today="experience.today" :label="experience.responsibilites"/>
          </skill-section>
          <skill-section :label="education.label">
            <education v-for="e, index in education.list" :key="index" :edu="e"/>
          </skill-section>
          <skill-section :label="project.label" :labelLink="project.label">
            <project v-for="p,index in project.list" :key="index" :project="p"/>
          </skill-section>
          <skill-section :label="interests.label">
            <span>{{interests.list.join(', ')}}</span>
          </skill-section>
          <div class="text-center text-sm mt-2 flex grow items-end">
            {{rights}}
          </div>
        </div>
  `,
  props: ['experience', 'education', 'project', 'interests', 'rights']
});
app.component('cv', {
  template: `
    <div class="w-[210mm] h-[297mm] p-[12mm] bg-white mx-auto mt-[10em] mb-[3em] shadow-lg text-gray flex flex-col gap-2 print:p-0 print:m-0 print:shadow-none">
      <slot/>
    </div>
  `
});
app.component('avatar', {
  template: `
      <img src="przemek.jpg" class="w-3/5 self-center rounded-full border-4 shadow-xl border-white aspect-square object-cover"/>
    `
});
app.component('cv-title', {
  template: `
          <div class="flex items-end gap-4 font-semibold">
            <span class="text-4xl text-primary">{{me.name}}</span>
            <span class="text-2xl text-darkgray">{{me.position}}</span>
          </div>
    `,
  props: ['me']
});
app.component('cv-subtitle', {
  template: '<div class="text-darkgray">{{me.description}}</div>',
  props: ['me']
});
app.component('skill-section', {
  template: `
      <div>
      <a class="text-primary font-bold border-b-2 border-b-bordergray text-2xl block pb-2 mb-2" :href="labelLink" target="_blank">{{ label }}</a>
      <div class="flex flex-col gap-2 py-2">
        <slot/>
      </div>
      </div>
    `,
  props: ['label', 'labelLink']
});
app.component('skill', {
  template: `
      <div class="flex justify-between">
      <span class="text-left">{{ label }}</span>
      <span class="flex gap-1 text-primary"><star v-for="i in 5" :key="i" :fill="i <= value"></star></span>
      </div>
    `,
  props: ['label', 'value']
});
app.component('star', {
  template: `
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current stroke-0 h-5 w-5" viewBox="0 0 24 24"
           :class="{'fill-current': fill, 'fill-transparent': !fill}">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
      </svg>
    `,
  props: ['fill']
});
app.component('pl-flag', {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-pl" viewBox="0 0 640 480" class="h-8 w-8">
      <g fill-rule="evenodd">
        <path fill="#fff" d="M640 480H0V0h640z"/>
        <path fill="#dc143c" d="M640 480H0V240h640z"/>
      </g>
    </svg>
  `
});
app.component('en-flag', {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb" viewBox="0 0 640 480" class="h-8 w-8">
      <path fill="#012169" d="M0 0h640v480H0z"/>
      <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
      <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
      <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
      <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
    </svg>
  `
});
app.component('experience', {
  template: `
      <div class="flex gap-2">
      <div class="w-1/5 font-bold text-xl text-darkgray">
        {{ formatDate(exp.from) }} - {{ formatDate(exp.to) }}
      </div>
      <div class="w-4/5 flex flex-col">
        <a class="text-xl font-bold text-darkgray" :href="exp.companyLink" target="_blank">{{ exp.company }}</a>
        <span class="font-italic">{{ exp.position }}</span>
        <ul class="list-disc"><span class="font-bold text-darkgray">{{label}}:</span>
          <li class="ml-5" v-for="r,index in exp.responsibilities" :key="index">{{ r }}</li>
        </ul>
      </div>
      </div>
    `,
  props: ['exp', 'label', 'link', 'today'],
  methods: {
    formatDate(value) {
      return formatYearMonth(value) || this.today;
    }
  }
});
app.component('education', {
  template: `
      <div class="flex gap-2">
      <div class="w-1/5 font-bold text-xl text-darkgray">
        {{ formatDate(edu.from) }} - {{ formatDate(edu.to) }}
      </div>
      <div class="w-4/5 flex flex-col">
        <a class="text-xl font-bold text-darkgray" :href="edu.universityLink" target="_blank">{{edu.university}}</a>
        <template v-for="t,index in edu.titles" :key="index">
          <span class="font-bold">{{t.title}}</span>
          <span>{{t.area}}</span> 
        </template>
      </div>
      </div>
    `,
  props: ['edu'],
  methods: {
    formatDate(value) {
      return formatYearMonth(value);
    }
  }
});
app.component('project', {
  template: `
      <div class="flex gap-2">
      <div class="w-1/5 font-bold text-xl text-darkgray">
        {{project.year}}
      </div>
      <div class="w-4/5 flex flex-col">
        <a class="text-xl font-bold text-darkgray" :href="project.link" target="_blank">{{project.link}}</a>
        <span>{{project.description}}</span>
      </div>
      </div>
    `,
  props: ['project']
});
app.component('language', {
  template: `
    <div class="fixed right-0 left-0 top-0 flex gap-4 justify-between bg-white shadow-lg p-4">
      <div class="flex flex-col">
        <span v-for="h, index in hints" :key="index">{{h}}</span>
      </div>
      <div class="flex gap-4">
        <pl-flag @click="$emit('lang', 'pl')" class="cursor-pointer"/>
        <en-flag @click="$emit('lang', 'en')" class="cursor-pointer"/>
      </div>
    </div>
  `,
  props: ['hints']
});
app.mount('#cv');