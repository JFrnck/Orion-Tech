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
          configuracion: Json | null
          activo: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          nombre: string
          subdominio: string
          logo_url?: string | null
          color_marca?: string | null
          plan?: string | null
          configuracion?: Json | null
          activo?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          nombre?: string
          subdominio?: string
          logo_url?: string | null
          color_marca?: string | null
          plan?: string | null
          configuracion?: Json | null
          activo?: boolean | null
          created_at?: string | null
        }
      }
      anios_lectivos: {
        Row: {
          id: string
          colegio_id: string | null
          nombre: string
          fecha_inicio: string | null
          fecha_fin: string | null
          activo: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          colegio_id?: string | null
          nombre: string
          fecha_inicio?: string | null
          fecha_fin?: string | null
          activo?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          colegio_id?: string | null
          nombre?: string
          fecha_inicio?: string | null
          fecha_fin?: string | null
          activo?: boolean | null
          created_at?: string | null
        }
      }
      grados: {
        Row: {
          id: string
          colegio_id: string | null
          nombre: string
          nivel: string
          created_at: string | null
        }
        Insert: {
          id?: string
          colegio_id?: string | null
          nombre: string
          nivel: string
          created_at?: string | null
        }
        Update: {
          id?: string
          colegio_id?: string | null
          nombre?: string
          nivel?: string
          created_at?: string | null
        }
      }
      secciones: {
        Row: {
          id: string
          grado_id: string | null
          nombre: string
          created_at: string | null
        }
        Insert: {
          id?: string
          grado_id?: string | null
          nombre: string
          created_at?: string | null
        }
        Update: {
          id?: string
          grado_id?: string | null
          nombre?: string
          created_at?: string | null
        }
      }
      perfiles: {
        Row: {
          id: string
          colegio_id: string | null
          nombre: string | null
          apellido: string | null
          rol: Database["public"]["Enums"]["user_role"] | null
          foto_url: string | null
          configuracion: Json | null
          created_at: string | null
        }
        Insert: {
          id: string
          colegio_id?: string | null
          nombre?: string | null
          apellido?: string | null
          rol?: Database["public"]["Enums"]["user_role"] | null
          foto_url?: string | null
          configuracion?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          colegio_id?: string | null
          nombre?: string | null
          apellido?: string | null
          rol?: Database["public"]["Enums"]["user_role"] | null
          foto_url?: string | null
          configuracion?: Json | null
          created_at?: string | null
        }
      }
      docentes: {
        Row: {
          id: string
          colegio_id: string | null
          dni: string | null
          nombres: string | null
          apellidos: string | null
          especialidad: string | null
          color_calendario: string | null
          telefono: string | null
          created_at: string | null
        }
        Insert: {
          id: string
          colegio_id?: string | null
          dni?: string | null
          nombres?: string | null
          apellidos?: string | null
          especialidad?: string | null
          color_calendario?: string | null
          telefono?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          colegio_id?: string | null
          dni?: string | null
          nombres?: string | null
          apellidos?: string | null
          especialidad?: string | null
          color_calendario?: string | null
          telefono?: string | null
          created_at?: string | null
        }
      }
      alumnos: {
        Row: {
          id: string
          colegio_id: string | null
          codigo_estudiante: string | null
          fecha_nacimiento: string | null
          info_medica: Json | null
          dni: string | null
          created_at: string | null
        }
        Insert: {
          id: string
          colegio_id?: string | null
          codigo_estudiante?: string | null
          fecha_nacimiento?: string | null
          info_medica?: Json | null
          dni?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          colegio_id?: string | null
          codigo_estudiante?: string | null
          fecha_nacimiento?: string | null
          info_medica?: Json | null
          dni?: string | null
          created_at?: string | null
        }
      }
      padres: {
        Row: {
          id: string
          colegio_id: string | null
          dni: string | null
          telefono_whatsapp: string | null
          datos_facturacion: Json | null
          created_at: string | null
        }
        Insert: {
          id: string
          colegio_id?: string | null
          dni?: string | null
          telefono_whatsapp?: string | null
          datos_facturacion?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          colegio_id?: string | null
          dni?: string | null
          telefono_whatsapp?: string | null
          datos_facturacion?: Json | null
          created_at?: string | null
        }
      }
      padres_alumnos_rel: {
        Row: {
          id: string
          padre_id: string | null
          alumno_id: string | null
          tipo_relacion: string | null
          es_responsable_pago: boolean | null
        }
        Insert: {
          id?: string
          padre_id?: string | null
          alumno_id?: string | null
          tipo_relacion?: string | null
          es_responsable_pago?: boolean | null
        }
        Update: {
          id?: string
          padre_id?: string | null
          alumno_id?: string | null
          tipo_relacion?: string | null
          es_responsable_pago?: boolean | null
        }
      }
      matriculas: {
        Row: {
          id: string
          alumno_id: string | null
          seccion_id: string | null
          anio_lectivo_id: string | null
          estado: Database["public"]["Enums"]["estado_matricula"] | null
          created_at: string | null
        }
        Insert: {
          id?: string
          alumno_id?: string | null
          seccion_id?: string | null
          anio_lectivo_id?: string | null
          estado?: Database["public"]["Enums"]["estado_matricula"] | null
          created_at?: string | null
        }
        Update: {
          id?: string
          alumno_id?: string | null
          seccion_id?: string | null
          anio_lectivo_id?: string | null
          estado?: Database["public"]["Enums"]["estado_matricula"] | null
          created_at?: string | null
        }
      }
      cursos: {
        Row: {
          id: string
          colegio_id: string | null
          nombre: string
          descripcion: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          colegio_id?: string | null
          nombre: string
          descripcion?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          colegio_id?: string | null
          nombre?: string
          descripcion?: string | null
          created_at?: string | null
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
        Insert: {
          id?: string
          curso_id?: string | null
          seccion_id?: string | null
          docente_id?: string | null
          anio_lectivo_id?: string | null
          imagen_portada?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          curso_id?: string | null
          seccion_id?: string | null
          docente_id?: string | null
          anio_lectivo_id?: string | null
          imagen_portada?: string | null
          created_at?: string | null
        }
      }
      horarios: {
        Row: {
          id: string
          clase_id: string | null
          dia_semana: number
          hora_inicio: string
          hora_fin: string
        }
        Insert: {
          id?: string
          clase_id?: string | null
          dia_semana: number
          hora_inicio: string
          hora_fin: string
        }
        Update: {
          id?: string
          clase_id?: string | null
          dia_semana?: number
          hora_inicio?: string
          hora_fin?: string
        }
      }
      unidades_academicas: {
        Row: {
          id: string
          clase_id: string | null
          titulo: string
          orden: number | null
          activo: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          clase_id?: string | null
          titulo: string
          orden?: number | null
          activo?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          clase_id?: string | null
          titulo?: string
          orden?: number | null
          activo?: boolean | null
          created_at?: string | null
        }
      }
      recursos_clase: {
        Row: {
          id: string
          clase_id: string | null
          unidad_id: string | null
          titulo: string
          archivo_url: string | null
          tipo: string | null
          visible: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          clase_id?: string | null
          unidad_id?: string | null
          titulo: string
          archivo_url?: string | null
          tipo?: string | null
          visible?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          clase_id?: string | null
          unidad_id?: string | null
          titulo?: string
          archivo_url?: string | null
          tipo?: string | null
          visible?: boolean | null
          created_at?: string | null
        }
      }
      bancos_preguntas: {
        Row: {
          id: string
          docente_id: string | null
          titulo: string
          tags: string[] | null
          created_at: string | null
        }
        Insert: {
          id?: string
          docente_id?: string | null
          titulo: string
          tags?: string[] | null
          created_at?: string | null
        }
        Update: {
          id?: string
          docente_id?: string | null
          titulo?: string
          tags?: string[] | null
          created_at?: string | null
        }
      }
      preguntas: {
        Row: {
          id: string
          banco_id: string | null
          tipo: Database["public"]["Enums"]["tipo_pregunta"]
          enunciado: string
          configuracion: Json
          puntaje_defecto: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          banco_id?: string | null
          tipo: Database["public"]["Enums"]["tipo_pregunta"]
          enunciado: string
          configuracion: Json
          puntaje_defecto?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          banco_id?: string | null
          tipo?: Database["public"]["Enums"]["tipo_pregunta"]
          enunciado?: string
          configuracion?: Json
          puntaje_defecto?: number | null
          created_at?: string | null
        }
      }
      actividades: {
        Row: {
          id: string
          clase_id: string | null
          unidad_id: string | null
          titulo: string
          descripcion: string | null
          tipo: Database["public"]["Enums"]["tipo_actividad"]
          fecha_publicacion: string | null
          fecha_entrega: string | null
          peso_nota: number | null
          configuracion_examen: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          clase_id?: string | null
          unidad_id?: string | null
          titulo: string
          descripcion?: string | null
          tipo: Database["public"]["Enums"]["tipo_actividad"]
          fecha_publicacion?: string | null
          fecha_entrega?: string | null
          peso_nota?: number | null
          configuracion_examen?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          clase_id?: string | null
          unidad_id?: string | null
          titulo?: string
          descripcion?: string | null
          tipo?: Database["public"]["Enums"]["tipo_actividad"]
          fecha_publicacion?: string | null
          fecha_entrega?: string | null
          peso_nota?: number | null
          configuracion_examen?: Json | null
          created_at?: string | null
        }
      }
      actividad_preguntas: {
        Row: {
          id: string
          actividad_id: string | null
          pregunta_id: string | null
          orden: number | null
          puntaje_asignado: number | null
        }
        Insert: {
          id?: string
          actividad_id?: string | null
          pregunta_id?: string | null
          orden?: number | null
          puntaje_asignado?: number | null
        }
        Update: {
          id?: string
          actividad_id?: string | null
          pregunta_id?: string | null
          orden?: number | null
          puntaje_asignado?: number | null
        }
      }
      entregas_tarea: {
        Row: {
          id: string
          actividad_id: string | null
          alumno_id: string | null
          archivo_url: string | null
          comentario_alumno: string | null
          fecha_entrega: string | null
          calificado: boolean | null
        }
        Insert: {
          id?: string
          actividad_id?: string | null
          alumno_id?: string | null
          archivo_url?: string | null
          comentario_alumno?: string | null
          fecha_entrega?: string | null
          calificado?: boolean | null
        }
        Update: {
          id?: string
          actividad_id?: string | null
          alumno_id?: string | null
          archivo_url?: string | null
          comentario_alumno?: string | null
          fecha_entrega?: string | null
          calificado?: boolean | null
        }
      }
      intentos_examen: {
        Row: {
          id: string
          actividad_id: string | null
          alumno_id: string | null
          fecha_inicio: string | null
          fecha_fin: string | null
          nota_final: number | null
          estado: string | null
        }
        Insert: {
          id?: string
          actividad_id?: string | null
          alumno_id?: string | null
          fecha_inicio?: string | null
          fecha_fin?: string | null
          nota_final?: number | null
          estado?: string | null
        }
        Update: {
          id?: string
          actividad_id?: string | null
          alumno_id?: string | null
          fecha_inicio?: string | null
          fecha_fin?: string | null
          nota_final?: number | null
          estado?: string | null
        }
      }
      respuestas_alumno: {
        Row: {
          id: string
          intento_id: string | null
          pregunta_id: string | null
          respuesta_json: Json | null
          es_correcta: boolean | null
          puntaje_obtenido: number | null
        }
        Insert: {
          id?: string
          intento_id?: string | null
          pregunta_id?: string | null
          respuesta_json?: Json | null
          es_correcta?: boolean | null
          puntaje_obtenido?: number | null
        }
        Update: {
          id?: string
          intento_id?: string | null
          pregunta_id?: string | null
          respuesta_json?: Json | null
          es_correcta?: boolean | null
          puntaje_obtenido?: number | null
        }
      }
      notas: {
        Row: {
          id: string
          actividad_id: string | null
          alumno_id: string | null
          valor_numerico: number | null
          retroalimentacion: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          actividad_id?: string | null
          alumno_id?: string | null
          valor_numerico?: number | null
          retroalimentacion?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          actividad_id?: string | null
          alumno_id?: string | null
          valor_numerico?: number | null
          retroalimentacion?: string | null
          updated_at?: string | null
        }
      }
      asistencias: {
        Row: {
          id: string
          clase_id: string | null
          alumno_id: string | null
          fecha: string | null
          estado: Database["public"]["Enums"]["estado_asistencia"] | null
          observacion: string | null
        }
        Insert: {
          id?: string
          clase_id?: string | null
          alumno_id?: string | null
          fecha?: string | null
          estado?: Database["public"]["Enums"]["estado_asistencia"] | null
          observacion?: string | null
        }
        Update: {
          id?: string
          clase_id?: string | null
          alumno_id?: string | null
          fecha?: string | null
          estado?: Database["public"]["Enums"]["estado_asistencia"] | null
          observacion?: string | null
        }
      }
      incidencias: {
        Row: {
          id: string
          alumno_id: string | null
          docente_reporta_id: string | null
          tipo: string | null
          descripcion: string | null
          fecha: string | null
        }
        Insert: {
          id?: string
          alumno_id?: string | null
          docente_reporta_id?: string | null
          tipo?: string | null
          descripcion?: string | null
          fecha?: string | null
        }
        Update: {
          id?: string
          alumno_id?: string | null
          docente_reporta_id?: string | null
          tipo?: string | null
          descripcion?: string | null
          fecha?: string | null
        }
      }
    }
    Enums: {
      user_role: 'admin' | 'colegio' | 'docente' | 'alumno' | 'padre'
      estado_matricula: 'activo' | 'retirado' | 'suspendido' | 'egresado'
      estado_asistencia: 'presente' | 'tarde' | 'falta_justificada' | 'falta_injustificada'
      tipo_actividad: 'tarea' | 'examen' | 'clase_vivo' | 'foro'
      tipo_pregunta: 'opcion_multiple' | 'verdadero_falso' | 'respuesta_corta' | 'relacionar'
    }
  }
}