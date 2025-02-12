type Student = {
  id: string;
  firstname: string;
  lastname: string;
  birthday: Date;
  class: Class;
};

type Teacher = {
  id: string;
  firstname: string;
  lastname: string;
  birthday: Date;
};

type Class = {
  id: string;
  name: string;
  teacher: Teacher;
  students: Student[];
};
