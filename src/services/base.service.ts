import Http, { get, post, patch, remove, put } from '@/utils/http';
import { removeEmptyValues } from '@/utils/index';

type TBaseRequest = {
  TSearch: any;
  TCreate: any;
  TUpdate: any;
  TExport: any;
};

type TBaseResponse = {
  TList: any;
  TDetail: any;
  TExcelFile: any;
};

export class BaseService<T extends Partial<TBaseRequest>, R extends Partial<TBaseResponse>> {
  get enity(): string | void {
    throw new Error('entity getter not defined');
  }

  get request() {
    return { Http, get, post, patch, remove, put };
  }

  async getList(parameters: Partial<T['TSearch']> = {}) {
    const params = removeEmptyValues(parameters);

    return await get<R['TList']>({ url: this.enity! }, { params });
  }

  async getByID(id: string | number) {
    return await get<R['TDetail']>({ url: `${this.enity!}/${id}` });
  }

  async create(data: T['TCreate']) {
    return await post<R['TDetail']>({ url: this.enity! }, { data: removeEmptyValues(data) });
  }

  async update(id: string | number, data: T['TUpdate']) {
    return await put<R['TDetail']>(
      { url: `${this.enity!}/${id}` },
      { data: removeEmptyValues(data) },
    );
  }

  async remove(id: string) {
    return await remove({ url: `${this.enity!}/${id}` });
  }

  async exportExcel(parameters: Partial<T['TExport']> = {}) {
    const params = removeEmptyValues(parameters);

    return await get<string>({ url: `${this.enity!}/export`, responseType: 'blob' }, { params });
  }
}
