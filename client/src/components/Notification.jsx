import { Store } from "react-notifications-component";

class Notification {
	success = (content, timeout = 5000) => {
		Store.addNotification({
			title: "Success",
			message: content,
			type: "success",
			insert: "top",
			container: "top-right",
			animationIn: ["animate__animated", "animate__fadeIn"],
			animationOut: ["animate__animated", "animate__fadeOut"],
			dismiss: {
				duration: timeout,
				onScreen: true,
			},
		});
	};

	error = (content, timeout = 5000) => {
		Store.addNotification({
			title: "Error",
			message: content,
			type: "danger",
			insert: "top",
			container: "top-right",
			animationIn: ["animate__animated", "animate__fadeIn"],
			animationOut: ["animate__animated", "animate__fadeOut"],
			dismiss: {
				duration: timeout,
				onScreen: true,
			},
		});
	};

	info = (content, timeout = 5000) => {
		Store.addNotification({
			title: "Info",
			message: content,
			type: "info",
			insert: "top",
			container: "top-right",
			animationIn: ["animate__animated", "animate__fadeIn"],
			animationOut: ["animate__animated", "animate__fadeOut"],
			dismiss: {
				duration: timeout,
				onScreen: true,
			},
		});
	};
}
export default new Notification();
