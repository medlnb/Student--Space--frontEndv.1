import './Task.css'

interface date {
  day: number;
  month: number;
  year: number;
  time: string;
}
interface TaskType {
  _id?: string,
  className: string,
  taskTitle: string,
  deadLine: date | null
}


interface TimeLeft {
  days: number;
  hours: number;
}

function calculateTimeLeft(deadline: date): TimeLeft {
  const currentDate = new Date();
  const targetDate = new Date(
    deadline.year,
    deadline.month - 1,
    deadline.day,
    ...deadline.time.split(':').map(Number)
  );

  const timeDifference = targetDate.getTime() - currentDate.getTime();

  if (timeDifference < 0) {
    return {
      days: 0,
      hours: 0,
    }
  }

  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return {
    days: daysLeft,
    hours: hoursLeft,
  }
}

function Task({ className, deadLine, taskTitle }: TaskType) {
  if (!deadLine)
    return
  
  const timeLeft = calculateTimeLeft(deadLine)
  return (
    <div className='task--container'>
      <h3>{`${className} (${taskTitle})`}</h3>
      <h3 style={{ whiteSpace: "nowrap" }}>{`${timeLeft.days}d ${timeLeft.hours}h`}</h3>
    </div>
  )
}

export default Task