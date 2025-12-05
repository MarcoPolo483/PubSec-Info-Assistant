// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { Catalog } from "../types";

/**
 * Spanish (es) locale translations.
 * Keys follow the pattern: page.section.element
 */
const es: Catalog = {
    common: {
        appTitle: "Asistente de Información",
        loading: "Cargando...",
        error: "Ocurrió un error",
        close: "Cerrar",
        cancel: "Cancelar",
        confirm: "Confirmar",
        save: "Guardar",
        delete: "Eliminar",
        edit: "Editar",
        add: "Agregar",
        search: "Buscar",
        clear: "Limpiar",
        submit: "Enviar",
        retry: "Reintentar",
        back: "Atrás",
        next: "Siguiente",
        preview: "vista previa",
        skipToContent: "Ir al contenido principal"
    },
    nav: {
        chat: "Chat",
        manageContent: "Administrar Contenido",
        mathAssistant: "Asistente de Matemáticas",
        tabularDataAssistant: "Asistente de Datos Tabulares"
    },
    chat: {
        title: "Chat",
        clearChat: "Limpiar chat",
        adjust: "Ajustar",
        info: "Información",
        placeholder: "Escribe una nueva pregunta (ej. ¿Quiénes son los principales ejecutivos de Microsoft, presentados como tabla?)",
        askQuestion: "Hacer pregunta",
        chatWithWorkData: "Chatea con tus datos de trabajo",
        chatWithWorkAndWebData: "Chatea con tus datos de trabajo y web",
        chatWithLLM: "Chatea directamente con un LLM",
        askAnything: "Pregunta lo que quieras o prueba un ejemplo",
        transparencyNote: "El Asistente de Información usa IA. Verifica los errores.",
        transparencyLink: "Nota de Transparencia",
        defaultFromWork: "Las preguntas se responderán por defecto desde Trabajo",
        defaultFromWeb: "Las preguntas se responderán por defecto desde Web",
        modes: {
            workOnly: "Trabajo",
            workPlusWeb: "Trabajo + Web",
            ungrounded: "Sin fundamento"
        },
        settings: {
            title: "Configurar generación de respuestas",
            defaultDatasource: "Usar esta fuente de datos para responder preguntas por defecto:",
            web: "Web",
            work: "Trabajo",
            retrieveDocuments: "Recuperar esta cantidad de documentos de la búsqueda:",
            suggestFollowup: "Sugerir preguntas de seguimiento",
            userPersona: "Persona del Usuario",
            systemPersona: "Persona del Sistema",
            filterResults: "Filtrar resultados de búsqueda por"
        },
        response: {
            length: "Longitud de Respuesta",
            temperature: "Temperatura de Respuesta",
            shorter: "Más corto",
            medium: "Medio",
            longer: "Más largo",
            creative: "Más Creativo",
            balanced: "Equilibrado",
            precise: "Más Preciso"
        },
        errors: {
            noResponse: "Sin cuerpo de respuesta",
            generic: "Lo siento, hubo un error al procesar tu solicitud."
        }
    },
    content: {
        title: "Administrar Contenido",
        upload: "Subir",
        delete: "Eliminar",
        refresh: "Actualizar",
        status: "Estado",
        fileName: "Nombre del Archivo",
        fileSize: "Tamaño del Archivo",
        uploadDate: "Fecha de Subida"
    },
    tutor: {
        title: "Asistente de Matemáticas"
    },
    tda: {
        title: "Asistente de Datos Tabulares"
    },
    a11y: {
        mainContent: "Contenido principal",
        navigation: "Navegación principal",
        closeDialog: "Cerrar diálogo",
        openMenu: "Abrir menú",
        expandSection: "Expandir sección",
        collapseSection: "Contraer sección"
    },
    locale: {
        switchLanguage: "Cambiar idioma",
        en: "English",
        es: "Español"
    }
};

export default es;
