export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      colegios: {
        Row: {
          id: string
          nombre: string
          subdominio: string
          logo_url: string | null
          color_marca: string | null
          plan: string | null
          activo: boolean | null
          configuracion: Json | null
          created_at: string | null
        }
      }
      alumnos: {
        Row: {
          id: string
          colegio_id: string
          dni: string
          nombres: string
          apellidos: string
          codigo_estudiante: string | null
          fecha_nacimiento: string | null
          info_medica: Json | null
          created_at: string | null
        }
      }
      docentes: {
        Row: {
          id: string
          colegio_id: string
          dni: string
          nombres: string
          apellidos: string
          especialidad: string | null
          telefono: string | null
          color_calendario: string | null
          created_at: string | null
        }
      }
      cursos: {
        Row: {
          id: string
          colegio_id: string
          nombre: string
          descripcion: string | null
        }
      }
      clases: {
        Row: {
          id: string
          curso_id: string | null
          seccion_id: string | null
          docente_id: string | null
          anio_lectivo_id: string | null
          imagen_portada: string | null
          created_at: string | null
        }
      }
    }
  }
}