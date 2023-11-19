import { useContext } from 'react'
import './Module.css'
import { ClassesContext } from '../../Contexts/Class'
import { useParams } from 'react-router-dom'

interface ClassType {
  Module: string,
  Teacher: string,
  description?: string,
  Chapter?: string
}



function Module() {
  const { state } = useContext(ClassesContext)
  const { selected } = useParams();

  if (selected == undefined)
    return
  if (!state)
    return

  if (state[0][0].Module == "default_value")
    return

  let module: ClassType[] = []

  state.map(element => {
    if (element[0].Module == selected.substring(1))
      module = element
  }
  )

  const groupedData: any[] = [];

  module.forEach((item) => {
    const chapterName = item.Chapter;
    const index = groupedData.findIndex((group) => group[0]?.Chapter === chapterName);

    if (index === -1) {
      groupedData.push([item]);
    } else {
      groupedData[index].push(item);
    }
  });
  const filtredgroupedData = groupedData.filter(chapter => (chapter[0].Chapter))

  const Chapters = filtredgroupedData.map((mdl, index) => {
    const inChapter = mdl.map((file: any, index: number) => (
      <a key={file.Link + file.title + index} href={file.Link} target="_blank">{file.title}</a>
    ))
    return (
      <div className='taskedit--create' key={index}>
        <div className='taskedit--title'>
          <h3>{mdl[0].Chapter}</h3>
        </div>
        <div className='taskedit--body'>
          {inChapter}
        </div>
      </div>
    )
  })

  return (
    <div className='sub--main--container'>
      <h1 className='sub--main--title'>{selected.substring(1)}</h1>
      <div className='module--container'>
        {Chapters}
      </div>
    </div>
  )
}

export default Module