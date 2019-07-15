import swal from 'sweetalert2';
import {Observable} from 'rxjs/Observable';

export class HelpersService {

  constructor() {
  }

  static alertSucces(message: string): void {
    swal('Nice!', message, 'success');
  }

  static errorsServer(errs) {
    let message = '';
    for (const error in errs) {
      if (errs.hasOwnProperty(error)) {
        message = `${message} ${errs[error][0]} \r`;
      }
    }
    swal('Oops!', message.trim(), 'error');
  }

  /* Сonfirmation upon deletion */
  public delete(): Observable<any> {
    const data = new Observable((observable) => {
      swal({
        title: 'Are you sure?',
        type: 'error',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'No, cancel',
        confirmButtonClass: 'mat-raised-button mat-warn',
        cancelButtonClass: 'mat-raised-button',
        buttonsStyling: false,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          observable.next(true);
        }
      });
    });
    return data;
  }

  /* Create Block for user/challenge */
  public blocked(title: string): Observable<any> {
    const data = new Observable((observable) => {
      swal({
        title: `Заблокировать ${title}`,
        text: 'Пожалуйста, введите причину блокировки:',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        customClass: 'app-popup-form',
        allowOutsideClick: false,
        preConfirm: (text) => {
          if (text === '') {
            swal.showValidationError('Введите причину блокировки');
            return false;
          }
        },
      }).then((result) => {
        if (result.value) {
          observable.next(result.value);
        }
      });
    });
    return data;
  }

}
