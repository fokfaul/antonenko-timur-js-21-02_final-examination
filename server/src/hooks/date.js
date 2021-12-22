const joiner = {en: " in ", ru: " в "};

exports.dateMDY = (date_iso, language = "ru") => {
    try
    {
        const d = date_iso ? new Date(date_iso) : new Date();
        if(d.toString() === "Invalid Date")
            return ""
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return d.toLocaleString(language, options);
    }
    catch
    {
        return ""
    }
}

exports.dateDMT = (date_iso, language = "ru") => {
    try
    {
        const d = date_iso ? new Date(date_iso) : new Date();
        if(d.toString() === "Invalid Date")
            return ""
        const options = {
          month: 'long',
          day: 'numeric',
          timezone: 'UTC',
          hour: 'numeric',
          minute: 'numeric'
        };
        return d.toLocaleString(language, options).split(", ").join(joiner[language]);
    }
    catch
    {
        return "";
    }
}