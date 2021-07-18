export const setEvent=(data)=>{
    return({
        Title: data["event_name"],
        Desc: data["event_description"],
        Type: data["event_type"],
        Duration: data["event_duration"],
        Date: data["event_date"].slice(0, 10),
        Host: data["course_code"],
        Time: data["event_date"].slice(11),
      });
}

export const setNewEvent=(data)=>{
  return({
    course_code:data.course_id,
    event_name: data.event_name,
    event_type: data.event_type[0].value,
    event_date: data.starting_date+" "+data.starting_from+":00",
    event_duration: data.event_duration,
  });
}