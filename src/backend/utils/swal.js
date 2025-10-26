import Swal from "sweetalert2";

const swalAlert = (title, text) => {
  const icon=title.toLowerCase();
   return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: "#003061",
    confirmButtonText: "OK",
  });
};

export default swalAlert;