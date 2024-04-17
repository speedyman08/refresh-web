import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Instance} from "./types/instance";
import {LazySubject} from "./lazy-subject";
import {LevelCategory} from "./types/levels/level-category";
import {Room} from "./types/rooms/room";
import {Level} from "./types/levels/level";
import {ListWithData} from "./list-with-data";

export const defaultPageSize: number = 40;

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly instance: LazySubject<Instance>;
  private readonly categories: LazySubject<ListWithData<LevelCategory>>;

  constructor(private http: HttpClient) {
    this.instance = new LazySubject<Instance>(() => this.http.get<Instance>("/instance"));
    this.instance.tryLoad();

    this.categories = new LazySubject<ListWithData<LevelCategory>>(() => this.http.get<ListWithData<LevelCategory>>("/levels?includePreviews=true"))
  }

  private createPageQuery(skip: number, count: number) {
    return new HttpParams()
        .set('skip', skip)
        .set('count', count);
  }

  getInstance() {
    return this.instance.asObservable();
  }

  getLevelCategories() {
    return this.categories.asObservable();
  }

  getRoomListing() {
    return this.http.get<ListWithData<Room>>("/rooms");
  }

  getLevelsInCategory(category: string, skip: number = 0, count: number = defaultPageSize) {
    return this.http.get<ListWithData<Level>>(`/levels/${category}`, {params: this.createPageQuery(skip, count)});
  }
}
