import i18next from 'i18next';

export const dateMDY = (date_iso) => {
    const language = i18next.language;
    const d = date_iso ? new Date(date_iso) : new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return d.toLocaleString(language, options);
}
export const dateDMT = (date_iso) => {
    const language = i18next.language;
    const d = date_iso ? new Date(date_iso) : new Date();
    const joiner = i18next.t("data.joiner");
    const options = {
      month: 'long',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric'
    };
    return d.toLocaleString(language, options).split(", ").join(joiner);
}