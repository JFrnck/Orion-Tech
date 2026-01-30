export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      actividad_preguntas: {
        Row: {
          actividad_id: string | null
          id: string
          orden: number | null
          pregunta_id: string | null
          puntaje_asignado: number | null
        }
        Insert: {
          actividad_id?: string | null
          id?: string
          orden?: number | null
          pregunta_id?: string | null
          puntaje_asignado?: number | null
        }
        Update: {
          actividad_id?: string | null
          id?: string
          orden?: number | null
          pregunta_id?: string | null
          puntaje_asignado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "actividad_preguntas_actividad_id_fkey"
            columns: ["actividad_id"]
            isOneToOne: false
            referencedRelation: "actividades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "actividad_preguntas_pregunta_id_fkey"
            columns: ["pregunta_id"]
            isOneToOne: false
            referencedRelation: "preguntas"
            referencedColumns: ["id"]
          },
        ]
      }
      actividades: {
        Row: {
          clase_id: string | null
          configuracion_examen: Json | null
          created_at: string | null
          descripcion: string | null
          fecha_entrega: string | null
          fecha_publicacion: string | null
          id: string
          peso_nota: number | null
          tipo: Database["public"]["Enums"]["tipo_actividad"]
          titulo: string
          unidad_id: string | null
        }
        Insert: {
          clase_id?: string | null
          configuracion_examen?: Json | null
          created_at?: string | null
          descripcion?: string | null
          fecha_entrega?: string | null
          fecha_publicacion?: string | null
          id?: string
          peso_nota?: number | null
          tipo: Database["public"]["Enums"]["tipo_actividad"]
          titulo: string
          unidad_id?: string | null
        }
        Update: {
          clase_id?: string | null
          configuracion_examen?: Json | null
          created_at?: string | null
          descripcion?: string | null
          fecha_entrega?: string | null
          fecha_publicacion?: string | null
          id?: string
          peso_nota?: number | null
          tipo?: Database["public"]["Enums"]["tipo_actividad"]
          titulo?: string
          unidad_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "actividades_clase_id_fkey"
            columns: ["clase_id"]
            isOneToOne: false
            referencedRelation: "clases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "actividades_unidad_id_fkey"
            columns: ["unidad_id"]
            isOneToOne: false
            referencedRelation: "unidades_academicas"
            referencedColumns: ["id"]
          },
        ]
      }
      alumnos: {
        Row: {
          codigo_estudiante: string | null
          dni: string | null
          fecha_nacimiento: string | null
          id: string
          info_medica: Json | null
        }
        Insert: {
          codigo_estudiante?: string | null
          dni?: string | null
          fecha_nacimiento?: string | null
          id: string
          info_medica?: Json | null
        }
        Update: {
          codigo_estudiante?: string | null
          dni?: string | null
          fecha_nacimiento?: string | null
          id?: string
          info_medica?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "alumnos_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      anios_lectivos: {
        Row: {
          activo: boolean | null
          colegio_id: string | null
          created_at: string | null
          fecha_fin: string | null
          fecha_inicio: string | null
          id: string
          nombre: string
        }
        Insert: {
          activo?: boolean | null
          colegio_id?: string | null
          created_at?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
          nombre: string
        }
        Update: {
          activo?: boolean | null
          colegio_id?: string | null
          created_at?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "anios_lectivos_colegio_id_fkey"
            columns: ["colegio_id"]
            isOneToOne: false
            referencedRelation: "colegios"
            referencedColumns: ["id"]
          },
        ]
      }
      asistencias: {
        Row: {
          alumno_id: string | null
          clase_id: string | null
          estado: Database["public"]["Enums"]["estado_asistencia"] | null
          fecha: string | null
          id: string
          observacion: string | null
        }
        Insert: {
          alumno_id?: string | null
          clase_id?: string | null
          estado?: Database["public"]["Enums"]["estado_asistencia"] | null
          fecha?: string | null
          id?: string
          observacion?: string | null
        }
        Update: {
          alumno_id?: string | null
          clase_id?: string | null
          estado?: Database["public"]["Enums"]["estado_asistencia"] | null
          fecha?: string | null
          id?: string
          observacion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asistencias_alumno_id_fkey"
            columns: ["alumno_id"]
            isOneToOne: false
            referencedRelation: "alumnos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asistencias_clase_id_fkey"
            columns: ["clase_id"]
            isOneToOne: false
            referencedRelation: "clases"
            referencedColumns: ["id"]
          },
        ]
      }
      bancos_preguntas: {
        Row: {
          created_at: string | null
          docente_id: string | null
          id: string
          tags: string[] | null
          titulo: string
        }
        Insert: {
          created_at?: string | null
          docente_id?: string | null
          id?: string
          tags?: string[] | null
          titulo: string
        }
        Update: {
          created_at?: string | null
          docente_id?: string | null
          id?: string
          tags?: string[] | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "bancos_preguntas_docente_id_fkey"
            columns: ["docente_id"]
            isOneToOne: false
            referencedRelation: "docentes"
            referencedColumns: ["id"]
          },
        ]
      }
      clases: {
        Row: {
          anio_lectivo_id: string | null
          created_at: string | null
          curso_id: string | null
          docente_id: string | null
          id: string
          imagen_portada: string | null
          seccion_id: string | null
        }
        Insert: {
          anio_lectivo_id?: string | null
          created_at?: string | null
          curso_id?: string | null
          docente_id?: string | null
          id?: string
          imagen_portada?: string | null
          seccion_id?: string | null
        }
        Update: {
          anio_lectivo_id?: string | null
          created_at?: string | null
          curso_id?: string | null
          docente_id?: string | null
          id?: string
          imagen_portada?: string | null
          seccion_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clases_anio_lectivo_id_fkey"
            columns: ["anio_lectivo_id"]
            isOneToOne: false
            referencedRelation: "anios_lectivos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clases_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clases_docente_id_fkey"
            columns: ["docente_id"]
            isOneToOne: false
            referencedRelation: "docentes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clases_seccion_id_fkey"
            columns: ["seccion_id"]
            isOneToOne: false
            referencedRelation: "secciones"
            referencedColumns: ["id"]
          },
        ]
      }
      colegios: {
        Row: {
          activo: boolean | null
          color_marca: string | null
          configuracion: Json | null
          created_at: string | null
          id: string
          logo_url: string | null
          nombre: string
          plan: string | null
          subdominio: string
        }
        Insert: {
          activo?: boolean | null
          color_marca?: string | null
          configuracion?: Json | null
          created_at?: string | null
          id?: string
          logo_url?: string | null
          nombre: string
          plan?: string | null
          subdominio: string
        }
        Update: {
          activo?: boolean | null
          color_marca?: string | null
          configuracion?: Json | null
          created_at?: string | null
          id?: string
          logo_url?: string | null
          nombre?: string
          plan?: string | null
          subdominio?: string
        }
        Relationships: []
      }
      cursos: {
        Row: {
          colegio_id: string | null
          created_at: string | null
          descripcion: string | null
          id: string
          nombre: string
        }
        Insert: {
          colegio_id?: string | null
          created_at?: string | null
          descripcion?: string | null
          id?: string
          nombre: string
        }
        Update: {
          colegio_id?: string | null
          created_at?: string | null
          descripcion?: string | null
          id?: string
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "cursos_colegio_id_fkey"
            columns: ["colegio_id"]
            isOneToOne: false
            referencedRelation: "colegios"
            referencedColumns: ["id"]
          },
        ]
      }
      docentes: {
        Row: {
          color_calendario: string | null
          dni: string | null
          especialidad: string | null
          id: string
          telefono: string | null
        }
        Insert: {
          color_calendario?: string | null
          dni?: string | null
          especialidad?: string | null
          id: string
          telefono?: string | null
        }
        Update: {
          color_calendario?: string | null
          dni?: string | null
          especialidad?: string | null
          id?: string
          telefono?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "docentes_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      entregas_tarea: {
        Row: {
          actividad_id: string | null
          alumno_id: string | null
          archivo_url: string | null
          calificado: boolean | null
          comentario_alumno: string | null
          fecha_entrega: string | null
          id: string
        }
        Insert: {
          actividad_id?: string | null
          alumno_id?: string | null
          archivo_url?: string | null
          calificado?: boolean | null
          comentario_alumno?: string | null
          fecha_entrega?: string | null
          id?: string
        }
        Update: {
          actividad_id?: string | null
          alumno_id?: string | null
          archivo_url?: string | null
          calificado?: boolean | null
          comentario_alumno?: string | null
          fecha_entrega?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entregas_tarea_actividad_id_fkey"
            columns: ["actividad_id"]
            isOneToOne: false
            referencedRelation: "actividades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entregas_tarea_alumno_id_fkey"
            columns: ["alumno_id"]
            isOneToOne: false
            referencedRelation: "alumnos"
            referencedColumns: ["id"]
          },
        ]
      }
      grados: {
        Row: {
          colegio_id: string | null
          created_at: string | null
          id: string
          nivel: string
          nombre: string
        }
        Insert: {
          colegio_id?: string | null
          created_at?: string | null
          id?: string
          nivel: string
          nombre: string
        }
        Update: {
          colegio_id?: string | null
          created_at?: string | null
          id?: string
          nivel?: string
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "grados_colegio_id_fkey"
            columns: ["colegio_id"]
            isOneToOne: false
            referencedRelation: "colegios"
            referencedColumns: ["id"]
          },
        ]
      }
      horarios: {
        Row: {
          clase_id: string | null
          dia_semana: number
          hora_fin: string
          hora_inicio: string
          id: string
        }
        Insert: {
          clase_id?: string | null
          dia_semana: number
          hora_fin: string
          hora_inicio: string
          id?: string
        }
        Update: {
          clase_id?: string | null
          dia_semana?: number
          hora_fin?: string
          hora_inicio?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "horarios_clase_id_fkey"
            columns: ["clase_id"]
            isOneToOne: false
            referencedRelation: "clases"
            referencedColumns: ["id"]
          },
        ]
      }
      incidencias: {
        Row: {
          alumno_id: string | null
          descripcion: string | null
          docente_reporta_id: string | null
          fecha: string | null
          id: string
          tipo: string | null
        }
        Insert: {
          alumno_id?: string | null
          descripcion?: string | null
          docente_reporta_id?: string | null
          fecha?: string | null
          id?: string
          tipo?: string | null
        }
        Update: {
          alumno_id?: string | null
          descripcion?: string | null
          docente_reporta_id?: string | null
          fecha?: string | null
          id?: string
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incidencias_alumno_id_fkey"
            columns: ["alumno_id"]
            isOneToOne: false
            referencedRelation: "alumnos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidencias_docente_reporta_id_fkey"
            columns: ["docente_reporta_id"]
            isOneToOne: false
            referencedRelation: "docentes"
            referencedColumns: ["id"]
          },
        ]
      }
      intentos_examen: {
        Row: {
          actividad_id: string | null
          alumno_id: string | null
          estado: string | null
          fecha_fin: string | null
          fecha_inicio: string | null
          id: string
          nota_final: number | null
        }
        Insert: {
          actividad_id?: string | null
          alumno_id?: string | null
          estado?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
          nota_final?: number | null
        }
        Update: {
          actividad_id?: string | null
          alumno_id?: string | null
          estado?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
          nota_final?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "intentos_examen_actividad_id_fkey"
            columns: ["actividad_id"]
            isOneToOne: false
            referencedRelation: "actividades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intentos_examen_alumno_id_fkey"
            columns: ["alumno_id"]
            isOneToOne: false
            referencedRelation: "alumnos"
            referencedColumns: ["id"]
          },
        ]
      }
      matriculas: {
        Row: {
          alumno_id: string | null
          anio_lectivo_id: string | null
          created_at: string | null
          estado: Database["public"]["Enums"]["estado_matricula"] | null
          id: string
          seccion_id: string | null
        }
        Insert: {
          alumno_id?: string | null
          anio_lectivo_id?: string | null
          created_at?: string | null
          estado?: Database["public"]["Enums"]["estado_matricula"] | null
          id?: string
          seccion_id?: string | null
        }
        Update: {
          alumno_id?: string | null
          anio_lectivo_id?: string | null
          created_at?: string | null
          estado?: Database["public"]["Enums"]["estado_matricula"] | null
          id?: string
          seccion_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matriculas_alumno_id_fkey"
            columns: ["alumno_id"]
            isOneToOne: false
            referencedRelation: "alumnos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matriculas_anio_lectivo_id_fkey"
            columns: ["anio_lectivo_id"]
            isOneToOne: false
            referencedRelation: "anios_lectivos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matriculas_seccion_id_fkey"
            columns: ["seccion_id"]
            isOneToOne: false
            referencedRelation: "secciones"
            referencedColumns: ["id"]
          },
        ]
      }
      notas: {
        Row: {
          actividad_id: string | null
          alumno_id: string | null
          id: string
          retroalimentacion: string | null
          updated_at: string | null
          valor_numerico: number | null
        }
        Insert: {
          actividad_id?: string | null
          alumno_id?: string | null
          id?: string
          retroalimentacion?: string | null
          updated_at?: string | null
          valor_numerico?: number | null
        }
        Update: {
          actividad_id?: string | null
          alumno_id?: string | null
          id?: string
          retroalimentacion?: string | null
          updated_at?: string | null
          valor_numerico?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "notas_actividad_id_fkey"
            columns: ["actividad_id"]
            isOneToOne: false
            referencedRelation: "actividades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notas_alumno_id_fkey"
            columns: ["alumno_id"]
            isOneToOne: false
            referencedRelation: "alumnos"
            referencedColumns: ["id"]
          },
        ]
      }
      padres: {
        Row: {
          datos_facturacion: Json | null
          dni: string | null
          id: string
          telefono_whatsapp: string | null
        }
        Insert: {
          datos_facturacion?: Json | null
          dni?: string | null
          id: string
          telefono_whatsapp?: string | null
        }
        Update: {
          datos_facturacion?: Json | null
          dni?: string | null
          id?: string
          telefono_whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "padres_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      padres_alumnos_rel: {
        Row: {
          alumno_id: string | null
          es_responsable_pago: boolean | null
          id: string
          padre_id: string | null
          tipo_relacion: string | null
        }
        Insert: {
          alumno_id?: string | null
          es_responsable_pago?: boolean | null
          id?: string
          padre_id?: string | null
          tipo_relacion?: string | null
        }
        Update: {
          alumno_id?: string | null
          es_responsable_pago?: boolean | null
          id?: string
          padre_id?: string | null
          tipo_relacion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "padres_alumnos_rel_alumno_id_fkey"
            columns: ["alumno_id"]
            isOneToOne: false
            referencedRelation: "alumnos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "padres_alumnos_rel_padre_id_fkey"
            columns: ["padre_id"]
            isOneToOne: false
            referencedRelation: "padres"
            referencedColumns: ["id"]
          },
        ]
      }
      perfiles: {
        Row: {
          apellido: string | null
          colegio_id: string | null
          configuracion: Json | null
          created_at: string | null
          foto_url: string | null
          id: string
          nombre: string | null
          rol: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          apellido?: string | null
          colegio_id?: string | null
          configuracion?: Json | null
          created_at?: string | null
          foto_url?: string | null
          id: string
          nombre?: string | null
          rol?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          apellido?: string | null
          colegio_id?: string | null
          configuracion?: Json | null
          created_at?: string | null
          foto_url?: string | null
          id?: string
          nombre?: string | null
          rol?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "perfiles_colegio_id_fkey"
            columns: ["colegio_id"]
            isOneToOne: false
            referencedRelation: "colegios"
            referencedColumns: ["id"]
          },
        ]
      }
      preguntas: {
        Row: {
          banco_id: string | null
          configuracion: Json
          created_at: string | null
          enunciado: string
          id: string
          puntaje_defecto: number | null
          tipo: Database["public"]["Enums"]["tipo_pregunta"]
        }
        Insert: {
          banco_id?: string | null
          configuracion: Json
          created_at?: string | null
          enunciado: string
          id?: string
          puntaje_defecto?: number | null
          tipo: Database["public"]["Enums"]["tipo_pregunta"]
        }
        Update: {
          banco_id?: string | null
          configuracion?: Json
          created_at?: string | null
          enunciado?: string
          id?: string
          puntaje_defecto?: number | null
          tipo?: Database["public"]["Enums"]["tipo_pregunta"]
        }
        Relationships: [
          {
            foreignKeyName: "preguntas_banco_id_fkey"
            columns: ["banco_id"]
            isOneToOne: false
            referencedRelation: "bancos_preguntas"
            referencedColumns: ["id"]
          },
        ]
      }
      recursos_clase: {
        Row: {
          archivo_url: string | null
          clase_id: string | null
          created_at: string | null
          id: string
          tipo: string | null
          titulo: string
          unidad_id: string | null
          visible: boolean | null
        }
        Insert: {
          archivo_url?: string | null
          clase_id?: string | null
          created_at?: string | null
          id?: string
          tipo?: string | null
          titulo: string
          unidad_id?: string | null
          visible?: boolean | null
        }
        Update: {
          archivo_url?: string | null
          clase_id?: string | null
          created_at?: string | null
          id?: string
          tipo?: string | null
          titulo?: string
          unidad_id?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "recursos_clase_clase_id_fkey"
            columns: ["clase_id"]
            isOneToOne: false
            referencedRelation: "clases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recursos_clase_unidad_id_fkey"
            columns: ["unidad_id"]
            isOneToOne: false
            referencedRelation: "unidades_academicas"
            referencedColumns: ["id"]
          },
        ]
      }
      respuestas_alumno: {
        Row: {
          es_correcta: boolean | null
          id: string
          intento_id: string | null
          pregunta_id: string | null
          puntaje_obtenido: number | null
          respuesta_json: Json | null
        }
        Insert: {
          es_correcta?: boolean | null
          id?: string
          intento_id?: string | null
          pregunta_id?: string | null
          puntaje_obtenido?: number | null
          respuesta_json?: Json | null
        }
        Update: {
          es_correcta?: boolean | null
          id?: string
          intento_id?: string | null
          pregunta_id?: string | null
          puntaje_obtenido?: number | null
          respuesta_json?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "respuestas_alumno_intento_id_fkey"
            columns: ["intento_id"]
            isOneToOne: false
            referencedRelation: "intentos_examen"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "respuestas_alumno_pregunta_id_fkey"
            columns: ["pregunta_id"]
            isOneToOne: false
            referencedRelation: "preguntas"
            referencedColumns: ["id"]
          },
        ]
      }
      secciones: {
        Row: {
          created_at: string | null
          grado_id: string | null
          id: string
          nombre: string
        }
        Insert: {
          created_at?: string | null
          grado_id?: string | null
          id?: string
          nombre: string
        }
        Update: {
          created_at?: string | null
          grado_id?: string | null
          id?: string
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "secciones_grado_id_fkey"
            columns: ["grado_id"]
            isOneToOne: false
            referencedRelation: "grados"
            referencedColumns: ["id"]
          },
        ]
      }
      unidades_academicas: {
        Row: {
          activo: boolean | null
          clase_id: string | null
          id: string
          orden: number | null
          titulo: string
        }
        Insert: {
          activo?: boolean | null
          clase_id?: string | null
          id?: string
          orden?: number | null
          titulo: string
        }
        Update: {
          activo?: boolean | null
          clase_id?: string | null
          id?: string
          orden?: number | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "unidades_academicas_clase_id_fkey"
            columns: ["clase_id"]
            isOneToOne: false
            referencedRelation: "clases"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      estado_asistencia:
        | "presente"
        | "tarde"
        | "falta_justificada"
        | "falta_injustificada"
      estado_matricula: "activo" | "retirado" | "suspendido" | "egresado"
      rol_usuario: "admin" | "docente" | "alumno" | "padre"
      tipo_actividad: "tarea" | "examen" | "clase_vivo" | "foro"
      tipo_pregunta:
        | "opcion_multiple"
        | "verdadero_falso"
        | "respuesta_corta"
        | "relacionar"
      user_role: "admin" | "colegio" | "docente" | "alumno" | "padre"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      estado_asistencia: [
        "presente",
        "tarde",
        "falta_justificada",
        "falta_injustificada",
      ],
      estado_matricula: ["activo", "retirado", "suspendido", "egresado"],
      rol_usuario: ["admin", "docente", "alumno", "padre"],
      tipo_actividad: ["tarea", "examen", "clase_vivo", "foro"],
      tipo_pregunta: [
        "opcion_multiple",
        "verdadero_falso",
        "respuesta_corta",
        "relacionar",
      ],
      user_role: ["admin", "colegio", "docente", "alumno", "padre"],
    },
  },
} as const
