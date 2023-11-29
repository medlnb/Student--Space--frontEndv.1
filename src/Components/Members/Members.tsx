import { useEffect, useState } from 'react'
import { Server } from '../../Data/API'
import './Members.css'

interface RequestType {
  _id: string,
  matricule: string,
  mail: string,
  firstname: string,
  lastname: string,
  Speciality: string,
}
function Members() {
  const [loading, setloading] = useState({
    accepte: false,
    decline: false
  })
  const [Requests, setRequests] = useState<RequestType[]>([])
  useEffect(() => {
    fetch(`${Server}/api/request`)
      .then(res => res.json())
      .then(data => setRequests(data))
  }, [])


  const HandleAccepte = async (_id: string) => {
    setloading({
      accepte: true,
      decline: false
    })
    const response = await fetch(`${Server}/api/request/${_id}`, {
      method: "POST"
    })
    setloading({
      accepte: false,
      decline: false
    })
    if (response.ok)
      setRequests(prev => prev.filter(request => request._id !== _id))
  }
  const HandleDecline = async (_id: string) => {
    setloading({
      accepte: false,
      decline: true
    })
  }

  return (
    <div className='editclass--container'>
      <div className='taskedit--create'>
        <div className='taskedit--title'>
          <h3>Manage Requests</h3>
        </div>
        <div className='members--body'>
          {Requests.map((request, index) => {
            return (
              <div key={index} className={`members--request ${index !== 0 && "istop--members--request"}`}>
                <div className='members--request--info'>
                  <h4>{`${request.lastname} ${request.firstname} ( ${request.Speciality} )`}</h4>
                  <p>{request.mail}</p>
                  <p>{request.matricule}</p>
                </div>
                <div className='members--request--buttons'>
                  <button
                    onClick={() => HandleAccepte(request._id)}
                    className={`members--request--button ${loading.accepte && "request--loading"}`}>
                    Accept
                  </button>

                  <button
                    onClick={() => HandleDecline(request._id)}
                    className={`members--request--button ${loading.decline && "request--loading"}`}>
                    Decline
                  </button>
                </div>
              </div>
            )

          })}
        </div>
      </div>
    </div>
  )
}

export default Members