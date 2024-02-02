import { useContext } from "react";
import "./Module.css";
import { ClassesContext } from "../../Contexts/Class";
import { useParams } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import { MdDownloadDone } from "react-icons/md";

interface ClassType {
  Module: string;
  Teacher: string;
  Chapter?: string;
}

const HandleDownload = (file: string) => {
  localStorage.setItem(file, "downloaded");
};

function Module() {
  const { state } = useContext(ClassesContext);
  const { selected } = useParams();

  if (selected == undefined) return;
  if (!state) return;

  if (state[0].Module == "default_value") return;

  let module: ClassType[] = state.filter(
    (element) => element.Module == selected.substring(1)
  );

  const groupedData: any[] = [];

  module.forEach((item) => {
    const chapterName = item.Chapter;
    const index = groupedData.findIndex(
      (group) => group[0]?.Chapter === chapterName
    );

    if (index === -1) {
      groupedData.push([item]);
    } else {
      groupedData[index].push(item);
    }
  });
  
  const filtredgroupedData = groupedData.filter(
    (chapter) => chapter[0].Chapter
  );

  const Chapters = filtredgroupedData.map((mdl, index) => {
    const inChapter = mdl.map((file: any, index: number) => {
      let download = null;

      if (file.Link.includes("drive.google.com")) {
        download = file.Link;
        download = download.split("/")[5];
        download = "https://drive.google.com/uc?export=download&id=" + download;
      }
      return (
        <div key={file.Link + file.title + index} className="cours">
          <a href={file.Link} target="_blank">
            {file.title}
          </a>
          {download &&
          localStorage.getItem(file.Module + file.title) !== "downloaded" ? (
            <a
              href={download}
              onClick={() => HandleDownload(file.Module + file.title)}
              style={{ display: "grid", placeItems: "center" }}
            >
              <IoMdDownload />
            </a>
          ) : download &&
            localStorage.getItem(file.Module + file.title) === "downloaded" ? (
            <MdDownloadDone />
          ) : (
            <></>
          )}
        </div>
      );
    });
    return (
      <div className="taskedit--create" key={index}>
        <div className="taskedit--title">
          <h3>{mdl[0].Chapter}</h3>
        </div>
        <div className="taskedit--body">{inChapter}</div>
      </div>
    );
  });

  return (
    <div className="sub--main--container ">
      <h1 className="sub--main--title">{selected.substring(1)}</h1>
      <div className="module--container">{Chapters}</div>
    </div>
  );
}

export default Module;
