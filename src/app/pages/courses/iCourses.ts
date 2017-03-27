interface ICourses {
  id: number;
  name: string;
  time: string;
  date: string;
  description: string;
  editCourses(r: string);
  deleteCourses(r: string);
}
