import Swal from "sweetalert2";

export const swalDelete = (action) => {
    Swal.fire({
        title: '정말 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '예',
        cancelButtonText: '아니오'
    }).then((result) => {
        if (result.isConfirmed) {
            action();
            Swal.fire(
                '삭제 완료',
                '데이터가 삭제되었습니다.',
                'success'
            );
        }
    });
};

