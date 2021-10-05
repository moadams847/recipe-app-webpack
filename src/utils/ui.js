class DataUi {
  constructor(table) {
    this.table = table;
  }

  clearUi() {
    this.table.innerHTML = "";
  }

  render(data, id) {
    if (data.created_at) {
      const when = dateFns.format(data.created_at.toDate(), "DD/MM/YYYY");

      let html = `
        <tr data-id="${id}">
        <td>${data.author}</td>
        <td>${data.title}</td>
        <td>${data.ingredients}</td>
        <td class="reshape"><a href="${data.procedure}" target="_blank">Time to practice</a></td>
        <td class="reshape">${when}</td>
        <td class="text-cente reshape show"><i class="fas fa-edit"></i></td>
        <td class="text-cente show"><i class="fas fa-trash"></i></td>
      </tr>
            
            `;
      this.table.innerHTML += html;
    }
  }

  removeFromDom(id) {
    if (id) {
      const dataTable = Array.from(this.table.children);
      dataTable.forEach((item) => {
        if (item.getAttribute("data-id") === id) {
          item.remove();
        }
      });
    }
  }

  updateDom(data, id) {
    if (id) {
      const dataTable = Array.from(this.table.children);
      dataTable.forEach((item) => {
        if (item.getAttribute("data-id") === id) {
          item.children[0].textContent = data.author;
          item.children[1].textContent = data.title;
          item.children[2].textContent = data.ingredients;
          item.children[3].children[0].textContent = data.procedure;
        }
      });
    }
  }
}

export { DataUi as default };
