import { createContext, useEffect, useState } from "react";

export const ScheduleContext = createContext<any>({
  ScheduleData: [
    [
      {
        "_id": "6547da68b590bd98c60f43bc",
        "id": 1,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43bd",
        "id": 2,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43be",
        "id": 3,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43bf",
        "id": 4,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c0",
        "id": 5,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c1",
        "id": 6,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Classroom 22",
        "type": "TP",
        "__v": 0
      }
    ],
    [
      {
        "_id": "6547da68b590bd98c60f43c2",
        "id": 7,
        "module": "Image Numérique",
        "Classroom": "Classroom 22",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c3",
        "id": 8,
        "module": "Statistics for Data Science",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c4",
        "id": 9,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Labo 7",
        "type": "TP",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c5",
        "id": 10,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c6",
        "id": 11,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c7",
        "id": 12,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Lab 07",
        "type": "TP",
        "__v": 0
      }
    ],
    [
      {
        "_id": "6547da68b590bd98c60f43c8",
        "id": 13,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c9",
        "id": 14,
        "module": "Digital Image",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43ca",
        "id": 15,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43cb",
        "id": 16,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43cc",
        "id": 17,
        "module": "Statistics for Data Science",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43cd",
        "id": 18,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Lab 07",
        "type": "TP",
        "__v": 0
      }
    ],
    [
      {
        "_id": "6547da68b590bd98c60f43ce",
        "id": 19,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43cf",
        "id": 20,
        "module": "Digital Image",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d0",
        "id": 21,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d1",
        "id": 22,
        "module": "Data exploration and visualization",
        "Classroom": "Labo 7",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d2",
        "id": 23,
        "module": "Statistics for Data Science",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d3",
        "id": 24,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Lab 07",
        "type": "TP",
        "__v": 0
      }
    ],
    [
      {
        "_id": "6547da68b590bd98c60f43d4",
        "id": 25,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d5",
        "id": 26,
        "module": "Programming for Data Science",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d6",
        "id": 27,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d7",
        "id": 28,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d8",
        "id": 29,
        "module": "Statistics for Data Science",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d9",
        "id": 30,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Lab 07",
        "type": "TP",
        "__v": 0
      }
    ],
    [
      {
        "_id": "6547da68b590bd98c60f43da",
        "id": 31,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43db",
        "id": 32,
        "module": "Digital Image",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43dc",
        "id": 33,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43dd",
        "id": 34,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43de",
        "id": 35,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43df",
        "id": 36,
        "module": "Anglais",
        "Classroom": "Lab 07",
        "type": "EL",
        "__v": 0
      }
    ]
  ],
  setScheduleData: null
})

export const ScheduleContextProvider = ({ children }: any) => {

  const [ScheduleData, setScheduleData] = useState([
    [
      {
        "_id": "6547da68b590bd98c60f43bc",
        "id": 1,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43bd",
        "id": 2,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43be",
        "id": 3,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43bf",
        "id": 4,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c0",
        "id": 5,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c1",
        "id": 6,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Classroom 22",
        "type": "TP",
        "__v": 0
      }
    ],
    [
      {
        "_id": "6547da68b590bd98c60f43c2",
        "id": 7,
        "module": "Image Numérique",
        "Classroom": "Classroom 22",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c3",
        "id": 8,
        "module": "Statistics for Data Science",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c4",
        "id": 9,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Labo 7",
        "type": "TP",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c5",
        "id": 10,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c6",
        "id": 11,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c7",
        "id": 12,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Lab 07",
        "type": "TP",
        "__v": 0
      }
    ],
    [
      {
        "_id": "6547da68b590bd98c60f43c8",
        "id": 13,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43c9",
        "id": 14,
        "module": "Digital Image",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43ca",
        "id": 15,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43cb",
        "id": 16,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43cc",
        "id": 17,
        "module": "Statistics for Data Science",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43cd",
        "id": 18,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Lab 07",
        "type": "TP",
        "__v": 0
      }
    ],
    [
      {
        "_id": "6547da68b590bd98c60f43ce",
        "id": 19,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43cf",
        "id": 20,
        "module": "Digital Image",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d0",
        "id": 21,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d1",
        "id": 22,
        "module": "Data exploration and visualization",
        "Classroom": "Labo 7",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d2",
        "id": 23,
        "module": "Statistics for Data Science",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d3",
        "id": 24,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Lab 07",
        "type": "TP",
        "__v": 0
      }
    ],
    [
      {
        "_id": "6547da68b590bd98c60f43d4",
        "id": 25,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d5",
        "id": 26,
        "module": "Programming for Data Science",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d6",
        "id": 27,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d7",
        "id": 28,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d8",
        "id": 29,
        "module": "Statistics for Data Science",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43d9",
        "id": 30,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Lab 07",
        "type": "TP",
        "__v": 0
      }
    ],
    [
      {
        "_id": "6547da68b590bd98c60f43da",
        "id": 31,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43db",
        "id": 32,
        "module": "Digital Image",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43dc",
        "id": 33,
        "module": "Mathematics for Machine Learning 1",
        "Classroom": "Classroom 24",
        "type": "Lecture",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43dd",
        "id": 34,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43de",
        "id": 35,
        "module": "",
        "Classroom": "",
        "type": "",
        "__v": 0
      },
      {
        "_id": "6547da68b590bd98c60f43df",
        "id": 36,
        "module": "Anglais",
        "Classroom": "Lab 07",
        "type": "EL",
        "__v": 0
      }
    ]
  ])
  
  useEffect(() => {
    const fetchingSchedule = async () => {
      const response = await fetch("https://student-space-backend.onrender.com/api/schedule")
      const json = await response.json()
      setScheduleData(json)
    }  
    fetchingSchedule()
  },[])
  
  return (
    <ScheduleContext.Provider value={{ ScheduleData, setScheduleData }}>
      {children}
    </ScheduleContext.Provider>
  )
}