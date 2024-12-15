import Swal from "sweetalert2";

/**
 * 공통으로 쓰게 만들랬다가 디자인마다 존나 다양해서
 * 그냥 각자 알아서 디자인해서 만들어쓰도록;;;
 */
export const showAddEventPopup = async () => {
    return await Swal.fire({
        title: "일정 등록",
        html: `
            <input type="text" id="event-title" class="swal2-input" placeholder="일정 제목">
            <textarea id="event-description" class="swal2-textarea" placeholder="상세 내용을 입력하세요"></textarea>
            <label style="display: flex; align-items: center; margin-top: 10px;">
                <input type="checkbox" id="event-important" style="margin-right: 10px;"> 중요한 일정
            </label>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "등록",
        cancelButtonText: "취소",
        preConfirm: () => {
            const title = document.getElementById("event-title").value;
            const description = document.getElementById("event-description").value;
            const isImportant = document.getElementById("event-important").checked;
            if (!title) {
                Swal.showValidationMessage("제목을 입력해야 합니다.");
            }
            return { title, description, isImportant };
        },
    });
};

export const showEditEventPopup = async (event) => {
    return await Swal.fire({
        title: "일정 수정",
        html: `
            <input type="text" id="event-title" class="swal2-input" placeholder="일정 제목" value="${event.title}">
            <textarea id="event-description" class="swal2-textarea" placeholder="상세 내용을 입력하세요">${event.description || ""}</textarea>
            <label style="display: flex; align-items: center; margin-top: 10px;">
                <input type="checkbox" id="event-important" style="margin-right: 10px;" ${
            event.backgroundColor === "red" ? "checked" : ""
        }> 중요한 일정
            </label>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "수정",
        cancelButtonText: "취소",
        preConfirm: () => {
            const title = document.getElementById("event-title").value;
            const description = document.getElementById("event-description").value;
            const isImportant = document.getElementById("event-important").checked;
            if (!title) {
                Swal.showValidationMessage("제목을 입력해야 합니다.");
            }
            return { title, description, isImportant };
        },
    });
};

export const showDeleteConfirmation = async () => {
    return await Swal.fire({
        title: "일정 삭제",
        text: "이 일정을 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
    });
};
