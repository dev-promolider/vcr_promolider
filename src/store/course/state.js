

export default () => ({
    allComments: [],
    allLessons: 0,
    allLessonsId: [],
    completedLessons: [],
    count: 1,
    course_active: [],
    course: [],
    courseHover: [],
    courseSelect: false,
    dataEx: null,
    dinamicClass: [],
    examDaily: true,
    gameData: {},
    isLoading: true,
    isLoadingComments: true,
    isLoadingRating: true,
    isResources: false,
    leaderBoard: [{
        active:false,
        encid:"",
        fullName:"",
        id: 0,
        LeftPoints:0,
        name:"",
        photo:"",
        qualified: true,
        RightPoints:0,
        total:0,
    }],
    lesson:[],
    moduleDinamic: {
        module_games: []
    },
    moduleExamen: {
        module_exams: []
    },
    points: 0,
    productor: null,
    progressCourseSelect: 0,
    renderVideo:false,
    resources: null,
    sumPoints: 0,
    timeReady: 0,
    ultimo: '',
    urlVideo: null,
})