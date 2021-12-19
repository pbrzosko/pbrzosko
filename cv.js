const App = {
  template: `
      <cv>
      <cv-title :me="me"></cv-title>
      <cv-subtitle :me="me"></cv-subtitle>
      <div class="flex">
        <cv-column-left :me="me" :skills="skills" :knowledge="knowledge" :certificates="certificates" :languages="languages"/>
        <cv-column-right :experience="experience" :education="education" :project="project" :interests="interests" :rights="rights"/>
      </div>
      </cv>
    `,
  data() {
    return {
      me: {
        name: 'Przemysław Brzosko',
        position: 'Java / JavaScript Developer',
        description: 'Master of Science in Teleinformatics and management in telecommunication. Has over 16 years of experience as a Java and JavaScript developer. Prefers working on a graphical user interface.',
        phone: '+48 608-289-033',
        email: 'przemek.brzosko@gmail.com',
        label: 'Personal data'
      },
      certificates: {
        label: 'Certificates',
        list: [
          'Sun Certified Programmer for Java 2 Platform, Standard Edition 6.0'
        ]
      },
      skills: {
        label: 'IT Tools',
        list: [{
          label: 'VUeJS / Bootstrap',
          value: 5
        },
          {
            label: 'Angular 12 / Material',
            value: 3
          },
          {
            label: 'HTML / CSS / JavaScript',
            value: 5
          },
          {
            label: 'Java / Spring / JSF',
            value: 5
          },
          {
            label: 'NodeJS / ExpressJS / MongoDB',
            value: 3
          },
          {
            label: 'SQL / Hibernate / Oracle',
            value: 2
          },
          {
            label: 'C / C++ / Qt',
            value: 2
          }]
      },
      knowledge: {
        label: 'IT Knowledge',
        list: [
          'IntelliJ / GIT / JIRA / Azure Devops',
          'Work alone and in teams',
          'Design patterns',
          'Scrum methodology',
          'Unit and e2e tests',
          'Graphics editors'
        ]
      },
      languages: {
        label: 'Languages',
        list: [
          {
            label: 'angielski',
            value: 5
          },
          {
            label: 'niemiecki',
            value: 2
          }
        ]
      },
      experience: {
        label: 'Experience',
        list: [
          {
            from: new Date(2019, 3),
            to: null,
            company: 'SDC A/S Polska',
            position: 'Senior Developer',
            responsibilities: [
              'One man team for all frontend applications in VueJS for whole advisory credit and banking department',
              'Implementation of credit processes using Java, Spring and Camunda',
              'Maintaining legacy systems'
            ]
          },
          {
            from: new Date(2012, 4),
            to: new Date(2019, 3),
            company: 'CoCoNet Polska',
            position: 'Area Expert, Scrum Master, Senior Systems Developer',
            responsibilities: [
              'Defining direction of evolution, consulting and code review in UI area',
              'Leadership of maintenance team in UI area',
              'Maintaining and development of huge financial application'
            ]
          },
          {
            from: new Date(2011, 9),
            to: new Date(2012, 4),
            company: 'IMPAQ Group',
            position: 'Developer',
            responsibilities: [
              'Implementation and installation of billing system for Prepaid users of a mobile operator'
            ]
          },
          {
            from: new Date(2005, 9),
            to: new Date(2011, 9),
            company: 'Pentacomp Systemy Informatyczne',
            position: 'Developer',
            responsibilities: [
              'Implementation of a system to manage sales products for insurance company',
              'Development and maintenance of a warehouse system for a mobile operator',
              'Customization and installation of a Business Intelligence system for a mobile operator'
            ]
          }
        ]
      },
      education: {
        label: 'Education',
        list: [
          {
            from: new Date(2002, 10),
            to: new Date(2007, 6),
            university: 'Warsaw University of Technology',
            titles: [
              {
                area: 'Teleinformatics and management in telecommunication',
                title: 'Master of science'
              },
              {
                area: 'Informatics, Electronics and Telecommunications',
                title: 'Bachelor of science'
              }
            ]
          }
        ]
      },
      project: {
        label: 'https://github.com/pbrzosko',
        list: [
          {
            year: 2021,
            link: 'https://pbrzosko.github.io/invoice-angular/',
            description: 'Invoice management app written in Angular'
          }
        ]
      },
      interests: {
        label: 'Interests',
        list: [
          'New technologies',
          'UI design',
          'SPA frameworks',
          'tennis',
          'motorsports'
        ]
      },
      rights: 'I hereby give consent for my personal data to be processed for the purpose of conducting recruitment for the position for which I am applying'
    };
  }
};
const app = Vue.createApp(App);

const formatYearMonth = function (value) {
  if (!value) return 'today';
  const month = ('0' + value.getMonth()).slice(-2);
  const year = ('000' + value.getFullYear()).slice(-4);
  return `${year}.${month}`;
};
app.component('cv-column-left', {
  template: `
    <div class="flex flex-col bg-gray-200 basis-2/6 p-2 gap-2 text-right">
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
    <div class="flex flex-col basis-4/6 p-2">
          <skill-section :label="experience.label">
            <experience v-for="e,index in experience.list" :key="index" :exp="e"/>
          </skill-section>
          <skill-section :label="education.label">
            <education v-for="e, index in education.list" :key="index" :edu="e"/>
          </skill-section>
          <skill-section :label="project.label">
            <project v-for="p,index in project.list" :key="index" :project="p"/>
          </skill-section>
          <skill-section :label="interests.label">
            <span>{{interests.list.join(', ')}}</span>
          </skill-section>
          <div class="text-center text-sm mt-2">
            {{rights}}
          </div>
        </div>
  `,
  props: ['experience', 'education', 'project', 'interests', 'rights']
});
app.component('cv', {
  template: `
    <div class="w-[210mm] h-[297mm] p-[12mm] bg-white mx-auto my-8 shadow-lg text-gray-600 flex flex-col gap-2 print:p-0 print:m-0 print:shadow-none">
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
          <div class="flex items-end gap-4">
            <span class="text-4xl font-semibold text-primary">{{me.name}}</span>
            <span class="text-2xl text-gray-600">{{me.position}}</span>
          </div>
    `,
  props: ['me']
});
app.component('cv-subtitle', {
  template: '<div>{{me.description}}</div>',
  props: ['me']
});
app.component('skill-section', {
  template: `
      <div>
      <div class="text-primary font-bold border-b-2 border-b-gray-300 text-2xl">{{ label }}</div>
      <div class="flex flex-col gap-2 py-2">
        <slot/>
      </div>
      </div>
    `,
  props: ['label']
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
app.component('experience', {
  template: `
      <div class="flex gap-2">
      <div class="w-1/5 font-bold text-xl text-black">
        {{ formatDate(exp.from) }} - {{ formatDate(exp.to) }}
      </div>
      <div class="w-4/5 flex flex-col">
        <span class="text-xl font-bold text-black">{{ exp.company }}</span>
        <span class="font-italic">{{ exp.position }}</span>
        <ul class="list-disc"><span class="font-bold">Responsibilites:</span>
          <li class="ml-5" v-for="r,index in exp.responsibilities" :key="index">{{ r }}</li>
        </ul>
      </div>
      </div>
    `,
  props: ['exp'],
  methods: {
    formatDate(value) {
      return formatYearMonth(value);
    }
  }
});
app.component('education', {
  template: `
      <div class="flex gap-2">
      <div class="w-1/5 font-bold text-xl text-black">
        {{ formatDate(edu.from) }} - {{ formatDate(edu.to) }}
      </div>
      <div class="w-4/5 flex flex-col">
        <span class="text-xl font-bold text-black">{{edu.university}}</span>
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
      <div class="w-1/5 font-bold text-xl text-black">
        {{project.year}}
      </div>
      <div class="w-4/5 flex flex-col">
        <span class="text-xl font-bold text-black">{{project.link}}</span>
        <span>{{project.description}}</span>
      </div>
      </div>
    `,
  props: ['project']
});
app.mount('#cv');