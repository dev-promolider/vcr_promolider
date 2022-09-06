export const course = (state) => state.course;
export const lesson = (state) => state.lesson;
export const allLessons = (state) => state.allLessons;
export const isLoading = (state) => state.isLoading;
export const resources = (state) => state.resources;
export const isResources = (state) => state.isResources;
export const completedLessons = (state) => state.completedLessons;
export const urlVideo = (state) => state.urlVideo;
export const timeReady = (state) => state.timeReady;
export const getProductor = (state) => state.productor;
export const getComments = (state) => state.allComments;
export const getRating = (state) => state.allRating.rates;
export const getCourseRating = (state) => state.courseRating;
export const getCourseActive = (state) => state.course_active;
export const getDataEx = (state) => state.dataEx;
export const getListLeaderBoard = (state) => state.leaderBoard.slice(3, state.leaderBoard.length)
export const getFirstPlaceLeaderBoard = (state) => state.leaderBoard.slice(0, 1)[0] || { name: 'noName', photo: require('@/assets/perfil-del-usuario.png') }
export const getSecondPlaceLeaderBoard = (state) => state.leaderBoard.slice(1, 2)[0] || { name: 'noName', photo: require('@/assets/perfil-del-usuario.png') }
export const getThirdPlaceLeaderBoard = (state) => state.leaderBoard.slice(2, 3)[0] || { name: 'noName', photo: require('@/assets/perfil-del-usuario.png') }

