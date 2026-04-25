import { Injectable } from '@angular/core';
import { Course, Tutor } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly tutors: Tutor[] = [
    {
      id: 'meriem-ben-salem',
      firstName: 'Meriem',
      lastName: 'Ben Salem',
      rating: 4.9,
      avatar: 'MB',
      title: {
        en: 'Mathematics mentor',
        fr: 'Mentore en mathematiques',
        ar: 'مؤطرة رياضيات'
      },
      bio: {
        en: 'Specialized in bac exam coaching, diagnostics, and adaptive remediation plans.',
        fr: 'Specialisee dans le coaching bac, le diagnostic et les plans de remediation adaptes.',
        ar: 'متخصصة في مرافقة البكالوريا والتشخيص وخطط المعالجة المخصصة.'
      },
      experience: {
        en: '9 years of online and in-center support teaching.',
        fr: '9 ans d enseignement de soutien en ligne et en centre.',
        ar: '9 سنوات من تدريس الدعم عبر الانترنت وداخل المراكز.'
      },
      subjects: [
        { en: 'Algebra', fr: 'Algebre', ar: 'الجبر' },
        { en: 'Analysis', fr: 'Analyse', ar: 'التحليل' },
        { en: 'Exam preparation', fr: 'Preparation examen', ar: 'التحضير للامتحان' }
      ],
      languages: ['French', 'Arabic'],
      price: '35 TND / session',
      nextSlot: {
        en: 'Tomorrow at 18:00',
        fr: 'Demain a 18:00',
        ar: 'غدا على الساعة 18:00'
      },
      availability: [
        { dayKey: 'calendar.monday', slots: ['18:00 - 20:00'] },
        { dayKey: 'calendar.wednesday', slots: ['17:00 - 19:00'] },
        { dayKey: 'calendar.saturday', slots: ['09:00 - 12:00'] }
      ]
    },
    {
      id: 'yassine-gharbi',
      firstName: 'Yassine',
      lastName: 'Gharbi',
      rating: 4.8,
      avatar: 'YG',
      title: {
        en: 'Computer science tutor',
        fr: 'Tuteur en informatique',
        ar: 'مدرس اعلامية'
      },
      bio: {
        en: 'Leads project-based coding sessions and algorithm bootcamps for university bridge students.',
        fr: 'Anime des sessions de code par projet et des bootcamps d algorithmique pour les etudiants passerelle.',
        ar: 'يقود حصص برمجة تطبيقية ومعسكرات خوارزميات لطلبة المستوى الجامعي.'
      },
      experience: {
        en: '7 years teaching programming, databases, and web fundamentals.',
        fr: '7 ans d enseignement en programmation, bases de donnees et web.',
        ar: '7 سنوات في تدريس البرمجة وقواعد البيانات و اساسيات الويب.'
      },
      subjects: [
        { en: 'Algorithms', fr: 'Algorithmes', ar: 'الخوارزميات' },
        { en: 'TypeScript', fr: 'TypeScript', ar: 'تايب سكريبت' },
        { en: 'Databases', fr: 'Bases de donnees', ar: 'قواعد البيانات' }
      ],
      languages: ['French', 'English', 'Arabic'],
      price: '45 TND / session',
      nextSlot: {
        en: 'Today at 20:00',
        fr: 'Aujourd hui a 20:00',
        ar: 'اليوم على الساعة 20:00'
      },
      availability: [
        { dayKey: 'calendar.tuesday', slots: ['19:00 - 21:00'] },
        { dayKey: 'calendar.thursday', slots: ['18:30 - 21:00'] },
        { dayKey: 'calendar.sunday', slots: ['10:00 - 12:00'] }
      ]
    },
    {
      id: 'salma-trabelsi',
      firstName: 'Salma',
      lastName: 'Trabelsi',
      rating: 5,
      avatar: 'ST',
      title: {
        en: 'Languages coach',
        fr: 'Coach en langues',
        ar: 'مدربة لغات'
      },
      bio: {
        en: 'Runs confidence-focused speaking labs for academic and professional goals.',
        fr: 'Anime des ateliers oraux centres sur la confiance et les objectifs academiques.',
        ar: 'تدير مختبرات محادثة تركّز على الثقة بالنفس والاهداف الدراسية.'
      },
      experience: {
        en: '8 years supporting French and English speaking progression.',
        fr: '8 ans d accompagnement en expression orale francaise et anglaise.',
        ar: '8 سنوات في مرافقة تطوير المحادثة بالفرنسية والانجليزية.'
      },
      subjects: [
        { en: 'French', fr: 'Francais', ar: 'الفرنسية' },
        { en: 'English', fr: 'Anglais', ar: 'الانجليزية' },
        { en: 'Public speaking', fr: 'Prise de parole', ar: 'التحدث امام الجمهور' }
      ],
      languages: ['French', 'English', 'Arabic'],
      price: '32 TND / session',
      nextSlot: {
        en: 'Friday at 19:30',
        fr: 'Vendredi a 19:30',
        ar: 'الجمعة على الساعة 19:30'
      },
      availability: [
        { dayKey: 'calendar.monday', slots: ['19:30 - 21:00'] },
        { dayKey: 'calendar.friday', slots: ['18:00 - 21:00'] },
        { dayKey: 'calendar.saturday', slots: ['15:00 - 18:00'] }
      ]
    }
  ];

  private readonly courses: Course[] = [
    {
      id: 'math-intensive',
      title: {
        en: 'Mathematics intensive support',
        fr: 'Soutien intensif en mathematiques',
        ar: 'دعم مكثف في الرياضيات'
      },
      category: {
        en: 'Secondary',
        fr: 'Secondaire',
        ar: 'ثانوي'
      },
      shortDescription: {
        en: 'Three guided sessions per week with quizzes, homework correction, and replay.',
        fr: 'Trois sessions guidees par semaine avec quiz, correction et replay.',
        ar: 'ثلاث حصص موجهة اسبوعيا مع اختبارات وتصحيح واجبات واعادة مشاهدة.'
      },
      description: {
        en: 'A structured support course for students needing stronger fundamentals and exam readiness in algebra and analysis.',
        fr: 'Un cours de soutien structure pour les eleves ayant besoin de consolider les bases et la preparation examen.',
        ar: 'برنامج دعم منظم للمتعلمين الذين يحتاجون الى تقوية الاساسيات والاستعداد للامتحان.'
      },
      level: {
        en: '3rd secondary and bac',
        fr: '3eme secondaire et bac',
        ar: 'ثالثة ثانوي وبكالوريا'
      },
      format: {
        en: 'Live online cohort',
        fr: 'Cohorte en ligne en direct',
        ar: 'مجموعة مباشرة عبر الانترنت'
      },
      duration: {
        en: '8 weeks',
        fr: '8 semaines',
        ar: '8 اسابيع'
      },
      price: '220 TND / month',
      teacherId: 'meriem-ben-salem',
      nextSession: {
        en: 'Monday at 18:00',
        fr: 'Lundi a 18:00',
        ar: 'الاثنين على الساعة 18:00'
      },
      outcomes: [
        {
          en: 'Master essential algebra methods',
          fr: 'Maitriser les methodes essentielles d algebre',
          ar: 'اتقان الطرق الاساسية في الجبر'
        },
        {
          en: 'Increase quiz speed under time pressure',
          fr: 'Ameliorer la rapidite sous contrainte de temps',
          ar: 'تحسين السرعة تحت ضغط الوقت'
        },
        {
          en: 'Follow a weekly remediation plan',
          fr: 'Suivre un plan hebdomadaire de remediation',
          ar: 'اتباع خطة معالجة اسبوعية'
        }
      ],
      modules: [
        {
          title: {
            en: 'Algebra refresh',
            fr: 'Remise a niveau en algebre',
            ar: 'مراجعة الجبر'
          },
          duration: '2 weeks'
        },
        {
          title: {
            en: 'Analysis and problem solving',
            fr: 'Analyse et resolution de problemes',
            ar: 'التحليل وحل المسائل'
          },
          duration: '3 weeks'
        },
        {
          title: {
            en: 'Exam drills',
            fr: 'Entrainement examen',
            ar: 'تدريب على الامتحان'
          },
          duration: '3 weeks'
        }
      ]
    },
    {
      id: 'english-speaking-lab',
      title: {
        en: 'English communication lab',
        fr: 'Laboratoire de communication en anglais',
        ar: 'مختبر التواصل باللغة الانجليزية'
      },
      category: {
        en: 'Languages',
        fr: 'Langues',
        ar: 'لغات'
      },
      shortDescription: {
        en: 'Small-group practice focused on speaking confidence and vocabulary reinforcement.',
        fr: 'Pratique en petit groupe orientee vers la confiance a l oral.',
        ar: 'ممارسة في مجموعات صغيرة لترسيخ الثقة في المحادثة والمفردات.'
      },
      description: {
        en: 'Weekly speaking circles, listening activities, and guided correction for academic fluency.',
        fr: 'Cercles de parole hebdomadaires, ecoute et correction guidee pour plus d aisance.',
        ar: 'ورشات محادثة اسبوعية وانشطة استماع وتصحيح موجه لتحسين الطلاقة.'
      },
      level: {
        en: 'Intermediate teens',
        fr: 'Adolescents intermediaires',
        ar: 'مراهقون مستوى متوسط'
      },
      format: {
        en: 'Workshop',
        fr: 'Atelier',
        ar: 'ورشة'
      },
      duration: {
        en: '6 weeks',
        fr: '6 semaines',
        ar: '6 اسابيع'
      },
      price: '180 TND / month',
      teacherId: 'salma-trabelsi',
      nextSession: {
        en: 'Friday at 19:30',
        fr: 'Vendredi a 19:30',
        ar: 'الجمعة على الساعة 19:30'
      },
      outcomes: [
        {
          en: 'Speak with more confidence',
          fr: 'Parler avec plus d assurance',
          ar: 'التحدث بثقة اكبر'
        },
        {
          en: 'Improve listening comprehension',
          fr: 'Ameliorer la comprehension orale',
          ar: 'تحسين الفهم السمعي'
        },
        {
          en: 'Use practical academic vocabulary',
          fr: 'Employer un vocabulaire academique utile',
          ar: 'استخدام مفردات دراسية عملية'
        }
      ],
      modules: [
        {
          title: {
            en: 'Warm-up speaking',
            fr: 'Expression orale de base',
            ar: 'تمارين محادثة تمهيدية'
          },
          duration: '2 weeks'
        },
        {
          title: {
            en: 'Listening and correction',
            fr: 'Ecoute et correction',
            ar: 'استماع وتصحيح'
          },
          duration: '2 weeks'
        },
        {
          title: {
            en: 'Role-play and confidence',
            fr: 'Jeux de role et confiance',
            ar: 'تمثيل ادوار وثقة'
          },
          duration: '2 weeks'
        }
      ]
    },
    {
      id: 'algorithms-bootcamp',
      title: {
        en: 'Algorithms and programming',
        fr: 'Algorithmique et programmation',
        ar: 'الخوارزميات والبرمجة'
      },
      category: {
        en: 'University bridge',
        fr: 'Passerelle universitaire',
        ar: 'تهيئة جامعية'
      },
      shortDescription: {
        en: 'Support course for logic, data structures, and coding mini-projects.',
        fr: 'Cours de soutien en logique, structures de donnees et mini projets.',
        ar: 'برنامج دعم في المنطق وهياكل المعطيات ومشاريع برمجية قصيرة.'
      },
      description: {
        en: 'A practical coding track for learners preparing for technical studies or struggling with programming logic.',
        fr: 'Un parcours pratique pour les apprenants preparant des etudes techniques ou en difficulte en logique.',
        ar: 'مسار عملي للمتعلمين المقبلين على الدراسات التقنية او الذين يواجهون صعوبات في منطق البرمجة.'
      },
      level: {
        en: 'University first years',
        fr: 'Premieres annees universitaires',
        ar: 'السنوات الجامعية الاولى'
      },
      format: {
        en: 'Live coding',
        fr: 'Code en direct',
        ar: 'برمجة مباشرة'
      },
      duration: {
        en: '10 weeks',
        fr: '10 semaines',
        ar: '10 اسابيع'
      },
      price: '260 TND / month',
      teacherId: 'yassine-gharbi',
      nextSession: {
        en: 'Thursday at 20:00',
        fr: 'Jeudi a 20:00',
        ar: 'الخميس على الساعة 20:00'
      },
      outcomes: [
        {
          en: 'Understand algorithmic reasoning',
          fr: 'Comprendre le raisonnement algorithmique',
          ar: 'فهم التفكير الخوارزمي'
        },
        {
          en: 'Write simple clean TypeScript code',
          fr: 'Ecrire un code TypeScript simple et propre',
          ar: 'كتابة كود TypeScript بسيط ومنظم'
        },
        {
          en: 'Complete guided programming tasks',
          fr: 'Completer des exercices programmes guides',
          ar: 'انجاز مهام برمجية موجهة'
        }
      ],
      modules: [
        {
          title: {
            en: 'Flowcharts and logic',
            fr: 'Organigrammes et logique',
            ar: 'المخططات والمنطق'
          },
          duration: '3 weeks'
        },
        {
          title: {
            en: 'Arrays and functions',
            fr: 'Tableaux et fonctions',
            ar: 'المصفوفات والدوال'
          },
          duration: '3 weeks'
        },
        {
          title: {
            en: 'Mini project sprint',
            fr: 'Sprint mini projet',
            ar: 'سباق مشروع مصغر'
          },
          duration: '4 weeks'
        }
      ]
    }
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: string): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  getTutors(): Tutor[] {
    return this.tutors;
  }

  getTutorById(id: string): Tutor | undefined {
    return this.tutors.find((tutor) => tutor.id === id);
  }

  getTutorForCourse(course: Course): Tutor | undefined {
    return this.getTutorById(course.teacherId);
  }
}
