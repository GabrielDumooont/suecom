import { Observable, Subscriber } from 'rxjs';

const reader = (file: any, subscriber: Subscriber<any>) => {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
        subscriber.next(filereader.result);
        subscriber.complete();
    };
    filereader.onerror = (error: any) => {
        subscriber.error(error);
        subscriber.complete();
    };
};

const fileToBase64 = (file: any): Promise<string> => new Observable((subscriber: Subscriber<any>) => {
    reader(file, subscriber);
}).toPromise();

export { fileToBase64 };