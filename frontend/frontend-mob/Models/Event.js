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