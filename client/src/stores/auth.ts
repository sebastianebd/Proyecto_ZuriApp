import {defineStore} from "pinia"
import {useApi, useApiPrivate} from "../composables/useApi"

export interface User{
  id: number,
  rut: string,
  nombre: string,
  apellido: string,
  fecha_nac: Date,
  direccion: string,
  telefono: number,
  email: string,
  ciudad:string,
  habilitado:string,
  tipo_cargo:string
}

export interface State{
  user: User,
  accessToken: string,
  authReady: boolean
}

export interface LoginData {
  rut: string,
  password: string
}

export interface RegisterDataReemplazo {
  rut_saliente: string,
  nombre_saliente: string,
  apellido_saliente: string,
  rut_entrante: string,
  nombre_entrante: string,
  apellido_entrante: string,
  tipo_turno: string,
  fecha_inicio:Date,
  fecha_termino:Date,
  servicio:string

}

export interface RegisterData {
  rut: string,
  nombre: string,
  apellido: string,
  fecha_nac: Date,
  direccion: string,
  telefono: number,
  email: string,
  ciudad:string,
  habilitado:string,
  tipo_cargo:string

}


export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      user: {} as User,
      accessToken: "" as string,
      authReady: false as boolean
    }
  },

  getters: {
    userDetail: (state: State) => state.user,
    isAuthenticated: (state: State) => state.accessToken ? true : false
  },

  actions:{
    async attempt(){
      try {
        await this.refresh()
        await this.getUser()
      } catch (error) {
        return
      }
      return
    },


    async login(payload: LoginData){
      try {
        const {data} = await useApi().post(`/api/auth/login`, payload);
        this.accessToken = data.access_token
        await this.getUser()
        return data
      } catch (error: Error | any) {
        console.log(error)
        throw error.message
      }
    },

    async register(payload: RegisterData){
      try {
        const {data} = await useApi().post('/api/auth/register', payload);
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async registerReemplazo(payload: RegisterDataReemplazo){
      try {
        const {data} = await useApi().post('/api/auth/registerReemplazo', payload);
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async actualizarReemplazo(reemplazoId: string, payload: RegisterDataReemplazo){
      try {
        const {data} = await useApi().put(`/api/auth/actualizarReemplazo/${reemplazoId}`, payload);
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async eliminarReemplazo(id: string) {
      try {
        const { data } = await useApiPrivate().delete(`/api/auth/eliminarReemplazo/${id}`);
        return data;
      } catch (error: Error | any) {
        throw error.message;
      }
    },

    async getUser(){
      try {
        const {data} = await useApiPrivate().get(`/api/auth/user`);
        this.user = data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async mostrarReemplazos(){
      try {
        const {data} = await useApiPrivate().get(`/api/auth/reemplazos`);
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async logout(){
      try {
        const {data} = await useApiPrivate().post(`/api/auth/logout`);
        this.accessToken = ""
        this.user = {} as User
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async refresh(){
      try {
        const {data} = await useApi().post(`/api/auth/refresh`);
        this.accessToken = data.access_token
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    }
  }
})