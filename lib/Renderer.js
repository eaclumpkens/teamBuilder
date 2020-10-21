const path = require("path");
const fs = require("fs");

const tempDir = path.resolve(__dirname, "../templates");

const render = employees => {
    const html = [];

    html.push(...employees
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => renderManager(manager)).join("")
    );

    html.push(...employees
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => renderEngineer(engineer)).join("")
    );

    html.push(...employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern)).join("")
    );

    return renderMain(html.join(""));

};

const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(tempDir, "manager.html"), "utf8");
    template = replacePlaceholders(template, "name", manager.getName());
    template = replacePlaceholders(template, "role", manager.getRole());
    template = replacePlaceholders(template, "email", manager.getEmail());
    template = replacePlaceholders(template, "id", manager.getID());
    template = replacePlaceholders(template, "officeNumber", manager.getOffice());
    return template;
};

const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(tempDir, "intern.html"), "utf8");
    template = replacePlaceholders(template, "name", intern.getName());
    template = replacePlaceholders(template, "role", intern.getRole());
    template = replacePlaceholders(template, "email", intern.getEmail());
    template = replacePlaceholders(template, "id", intern.getID());
    template = replacePlaceholders(template, "school", intern.getSchool());
    return template;
};

const renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(tempDir, "engineer.html"), "utf8");
    template = replacePlaceholders(template, "name", engineer.getName());
    template = replacePlaceholders(template, "role", engineer.getRole());
    template = replacePlaceholders(template, "email", engineer.getEmail());
    template = replacePlaceholders(template, "id", engineer.getID());
    template = replacePlaceholders(template, "github", engineer.getGithub());
    return template;
};

const renderMain = html => {
    const template = fs.readFileSync(path.resolve(tempDir, "main.html"), "utf8");
    return replacePlaceholders(template, "team", html);
  };
  
  const replacePlaceholders = (template, placeholder, value) => {
    const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
    return template.replace(pattern, value);
  };

module.exports = render;