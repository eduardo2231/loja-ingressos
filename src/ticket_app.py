import tkinter as tk
from tkinter import ttk
import sqlite3

screen = tk.Tk()
screen.configure(bg="grey")

screen.title('Loja de Ingressos')
screen.geometry('858x700')
style = ttk.Style()
screen.resizable(False, False)

conn = sqlite3.connect('../tickets.db')
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS ingressos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    quantidade INTEGER NOT NULL
)
""")

conn.commit()

def fechar_e_chamar(scren, x):
    scren.destroy()
    if x == 1:
        frame_ingressos_config()
    elif x == 2:
        frame_remover_ingressos()

def delete(ids):
    cursor.execute("DELETE FROM ingressos WHERE id = ?", (ids,))
    atualizar_lista()


def atualizar_lista():
                                                                                      # Limpa a Treeview
    for item in list_buy.get_children():
        list_buy.delete(item)

    cursor.execute("SELECT id, nome, preco, quantidade FROM ingressos")
    ingressos = cursor.fetchall()

    for ingresso in ingressos:
        list_buy.insert("", "end", values=ingresso)

def add(nome, descricao, preco, quantidade):
    precos = preco.get()
    descricaos = descricao.get()
    nomes = nome.get()
    quantidades = int(quantidade.get())
    values = (nomes, descricaos, precos, quantidades)
    insert_ingresso(values)                                                      # Chamando a funcao insert_ingresso e colocando os valores retornados de nome, quantidade, preco e classificao()

def insert_ingresso(values):
    print(values)
    cursor.execute("""
    INSERT INTO ingressos (nome, preco, descricao, quantidade)
    VALUES (?, ?, ?, ?)
    """, (values[0], values[1], values[2], values[3]))
    atualizar_lista()
    conn.commit()

def user_perfil():
    new = tk.Toplevel(screen, bg='grey')
    new.geometry('500x300')
    new.title("Perfil de Usuario")
    new.resizable(False, False)

    new_caixa = tk.Frame(new, bg='lightgray', width=480, height=280)
    new_caixa.grid(column=1, row=0, padx=10, pady=10)
    new_caixa.grid_propagate(False)

    button_colocar = tk.Button(new_caixa, text="Adicionar Ingresso", font=('Arial', 12), width=18, bg='white',
                               command=lambda: fechar_e_chamar(new, 1)) # 1 server pra especificar que queremos a chamar funcao de ingressos
    button_colocar.place(x=295, y=235)

    button_remove = tk.Button(new_caixa, text="Remover Ingresso", font=('Arial', 12), width=18, bg='white', command=lambda: fechar_e_chamar(new, 2))
    button_remove.place(x=15, y=235)

def frame_remover_ingressos():
    new = tk.Toplevel(screen, bg='grey')
    new.geometry('800x600')
    new.title("Remover Ingresso")
    new.resizable(False, False)

    new_caixa = tk.Frame(new, bg='lightgray', width=780, height=580)
    new_caixa.grid(column=1, row=0, padx=10, pady=10)
    new_caixa.grid_propagate(False)

    list_remove = ttk.Treeview(new_caixa, columns=['ID','Evento', 'Preço', 'Quantidade'], show='headings', height=27)
    style.configure(
        "Treeview.Heading",
        background='white',
        font=('Arial', 13, "bold"),
    )
    style.configure(
        'Treeview',
        background='white',
        font=("Arial", 13))

    list_remove.heading('ID', text='ID')
    list_remove.heading("Evento", text="Evento")
    list_remove.heading("Preço", text="Preço")
    list_remove.heading("Quantidade", text="Quantidade")
    list_remove.column('ID', width=40)
    list_remove.column("Evento", minwidth=0, width=120)
    list_remove.column("Preço", minwidth=0, width=120)
    list_remove.column("Quantidade", minwidth=0, width=120)
    list_remove.grid(column=0, row=0, padx=7, pady=5)

    scroll_remove = tk.Scrollbar(new_caixa)
    scroll_remove.grid_remove()

    list_remove.config(yscrollcommand=scroll_remove.set)
    scroll_remove.config(command=list_remove.yview)

    cursor.execute("SELECT id, nome, preco, quantidade FROM ingressos")
    ingressos = cursor.fetchall()

    for igresso in ingressos:
        list_remove.insert("", "end", values=igresso)


    def mostar_info_remove(event):
        info_product = tk.Frame(new_caixa, bg='white', width=360, height=560)
        info_product.place(x=415, y=8)

        idB, name, desc, price, quantidade = get_info_ticket(list_remove)

        info2 = tk.Label(info_product, text=f"{name}\n\n{desc}\n\nPreço: {price} Quantidade: {quantidade}",
                         font=('Arial', 12), width=0, height=0, bg='white', wraplength=390,
                         justify="left")
        info2.place(x=10, y=10)

        button_buy = tk.Button(info_product, text='Remover', font=('Arial', 12), width=36, height=2,
                               bg='white')
        button_buy.place(x=15, y=500)

    list_remove.bind("<<TreeviewSelect>>", mostar_info_remove)

def get_info_ticket(tree):

    if not tree.selection():
        return None
    values = tree.selection()
    valores = tree.item(values, "values")

    valor_id = valores[0]

    cursor.execute("SELECT * FROM ingressos WHERE id = ?", (valor_id,))
    ingressos = cursor.fetchall()

    # valores_descricao = valores[4]

    return ingressos[0]

def frame_ingressos_config():
    new = tk.Toplevel(screen, bg='grey')
    new.geometry('500x300')
    new.title("Adicionar Ingresso")
    new.resizable(False, False)

    new_caixa = tk.Frame(new, bg='lightgray', width=480, height=280)
    new_caixa.grid(column=1, row=0, padx=10, pady=10)
    new_caixa.grid_propagate(False)

    label_nome = tk.Label(new_caixa, text="Nome do ingresso:", bg='lightgrey', font=('arial', 15, 'bold'))
    label_nome.place(x=10, y=10)
    entry_nome = tk.Entry(new_caixa, font=('arial', 15, 'bold'))
    entry_nome.place(x=240, y=10)

    label_preco = tk.Label(new_caixa, text="Valor:", bg='lightgrey', font=('arial', 15, 'bold'))
    label_preco.place(x=10, y=50)
    entry_valor = tk.Entry(new_caixa, font=('arial', 15, 'bold'))
    entry_valor.place(x=240, y=50)

    label_descricao = tk.Label(new_caixa, text="Descricao:", bg='lightgrey', font=('arial', 15, 'bold'))
    label_descricao.place(x=10, y=90)
    entry_descricao = tk.Entry(new_caixa, font=('arial', 15, 'bold'))
    entry_descricao.place(x=240, y=90)

    label_quantidade = tk.Label(new_caixa, text="Quantidade:", bg='lightgrey', font=('arial', 15, 'bold'))
    label_quantidade.place(x=10, y=130)
    entry_quantidade = tk.Entry(new_caixa, font=('arial', 15, 'bold'))
    entry_quantidade.place(x=240, y=130)

    button_cancelar = tk.Button(new_caixa, text="Cancelar", font=('Arial', 12), width=10, bg='white', command=new.destroy)
    button_cancelar.place(x=10, y=240)

    button_add = tk.Button(new_caixa, text="Add", font=('Arial', 12), width=10, bg='white',
                           command=lambda: add(entry_nome,entry_valor, entry_descricao, entry_quantidade))
    button_add.place(x=370, y=240)

def pagar():
    new = tk.Toplevel(screen, bg='grey')
    new.geometry('500x400')
    new.title("Pagamento")
    new.resizable(False, False)

    new_caixa = tk.Frame(new, bg='lightgray', width=480, height=380)       
    new_caixa.grid(column=1, row=0, padx=10, pady=10)
    new_caixa.grid_propagate(False)

    button_pay = tk.Button(new_caixa, text='Finalizar Pagamento', font=('Arial', 12), width=20, height=2)
    button_pay.place(x=280, y=320)

    button_cancel = tk.Button(new_caixa, text='Cancelar', font=('Arial', 12), width=10, height=2, command=new.destroy)
    button_cancel.place(x=10, y=320)

def mostar_info(event):
    info_product = tk.Frame(caixa, bg='white', width=410, height=630)
    info_product.place(x=9, y=50)

    ids, name, desc, price, quantidade = get_info_ticket(list_buy)
    print(ids, name, desc, price, quantidade)

    info3 = tk.Label(info_product, text=f"{name}\n"
                                        f"\n{desc}\n\nPreço: {price} Quantidade: {quantidade}", font=('Arial', 12), width=0, height=0, bg='white', wraplength=390, justify="left")
    info3.place(x=10, y=10)

    button_buy = tk.Button(info_product, text='Comprar', font=('Arial', 12), width=40, height=2, command=pagar, bg='white')
    button_buy.place(x=15, y=560)


caixa = tk.Frame(screen, bg='lightgray', width=430, height=685)
caixa.grid(column=1, row=0, padx=5, pady=5)
caixa.grid_propagate(False)

info = tk.Label(caixa, bg="lightgrey", font=('Arial', 18, "bold"), text="Loja de Ingressos")
info.place(x=10, y=5)

perfil_button = tk.Button(caixa, text='Conta', font=('Arial', 12, " bold"), command=user_perfil)
perfil_button.place(x=360, y=5)

list_buy = ttk.Treeview(screen, columns=['ID', 'Evento', 'Preço', 'Quantidade'], show='headings', height=33)

style.configure(
    "Treeview.Heading",
    font=('Arial', 13, "bold"),
    fieldbackground="lightgray",
    background="lightgray",
)
style.configure(
    'Treeview',
    background="lightgray",
    fieldbackground="lightgray",
    font=("Arial", 13))

list_buy.heading("ID", text="ID")
list_buy.heading("Evento", text="Evento")
list_buy.heading("Preço", text="Preço")
list_buy.heading("Quantidade", text="Quantidade")
list_buy.column("ID", minwidth=0, width=40)
list_buy.column("Evento", minwidth=0, width=120)
list_buy.column("Preço", minwidth=0, width=120)
list_buy.column("Quantidade", minwidth=0, width=120)
list_buy.grid(column=0, row=0, padx=7, pady=5)

list_buy.bind("<<TreeviewSelect>>", mostar_info)

scroll_buy = tk.Scrollbar(screen)
scroll_buy.grid_remove()

list_buy.config(yscrollcommand=scroll_buy.set)
scroll_buy.config(command=list_buy.yview)

atualizar_lista()

screen.mainloop()










# bananas sao gostosas e demais