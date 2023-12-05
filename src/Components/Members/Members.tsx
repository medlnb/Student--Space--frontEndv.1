import { useEffect, useState } from 'react'
import { Server } from '../../Data/API'
import './Members.css'
import PropagateLoader from 'react-spinners/PropagateLoader';

interface RequestType {
  _id: string,
  matricule: string,
  mail: string,
  firstname: string,
  lastname: string,
  Speciality: string,
}
function Members() {
  const [loadingAccept, setLoadingAccept] = useState<string | null>(
    null);
  const [loadingDecline, setLoadingDecline] = useState<string | null>(null);
  const [Requests, setRequests] = useState<RequestType[]>([
    {
      _id: "Default_Value",
      matricule: "string",
      mail: "string",
      firstname: "string",
      lastname: "string",
      Speciality: "string",
    }
  ]);

  useEffect(() => {
    fetch(`${Server}/api/request`)
      .then(res => {
        if (!res.ok)
          throw new Error("Error while fetching")
        return res.json()
      })
      .then(data => setRequests(data))
      .catch(err => { console.log(err) })
    
  }, [])


  const HandleAccepte = async (_id: string) => {
    setLoadingAccept(_id);
    const response = await fetch(`${Server}/api/request/${_id}`, {
      method: "POST",
    });
    setLoadingAccept(null);
    if (response.ok) {
      setRequests((prev) => prev.filter((request) => request._id !== _id));
    }
  };

  const HandleDecline = async (_id: string) => {
    setLoadingDecline(_id);
    const response = await fetch(`${Server}/api/request/reject/${_id}`, {
      method: "POST",
    });
    setLoadingDecline(null);
    if (response.ok) {
      setRequests((prev) => prev.filter((request) => request._id !== _id));
    }
  };

  return (
    <div className='editclass--container'>
      <div className='taskedit--create'>
        <div className='taskedit--title'>
          <h3>Manage Requests</h3>
        </div>
        <div className='members--body'>
          {Requests.length === 0 && "No New Requests"}
          {Requests.length === 1 && Requests[0]._id === "Default_Value"
            ?
            <div className='loader--container'>
              <PropagateLoader
                color={"white"}
                loading={true}
                size={20}
              />
            </div>
            :
            Requests.map((request, index) => (
              <div
                key={index}
                className={`members--request ${index !== 0 && "istop--members--request"}`}
              >
                <div className='members--request--info'>
                  <h4>{`${request.lastname} ${request.firstname} ( ${request.Speciality} )`}</h4>
                  <p>{request.mail}</p>
                  <p>{request.matricule}</p>
                </div>
                <div className='members--request--buttons'>
                  <button
                    onClick={() => HandleAccepte(request._id)}
                    className={loadingAccept === request._id ? "request--loading" : "members--request--button"}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => HandleDecline(request._id)}
                    className={loadingDecline === request._id ? "request--loading" : "members--request--button"}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Members;
