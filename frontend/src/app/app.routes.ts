import { Routes } from '@angular/router';
import { ContaEntrarComponent } from './conta-entrar/conta-entrar.component';
import { ContaCadastrarComponent } from './conta-cadastrar/conta-cadastrar.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VendasComponent } from './vendas/vendas.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ContaConfiguracoesComponent } from './conta-configuracoes/conta-configuracoes.component';
import { ContaCompartilharComponent } from './conta-compartilhar/conta-compartilhar.component';
import { LayoutLojaComponent } from './layout-loja/layout-loja.component';
import { LojaComponent } from './loja/loja.component';
import { LojaCategoriaComponent } from './loja-categoria/loja-categoria.component';
import { LojaBuscaComponent } from './loja-busca/loja-busca.component';
import { LojaProdutoComponent } from './loja-produto/loja-produto.component';

export const routes: Routes = [
    { 
        path: "", 
        component: ContaEntrarComponent 
    },
    { 
        path: "conta-cadastrar", 
        component: ContaCadastrarComponent
    },
    {
        path: "layout",
        component: LayoutComponent,
        children: [
            {
                path: "dashboard",
                component: DashboardComponent
            },
            {
                path: "vendas",
                component: VendasComponent
            },
            {
                path: "categorias",
                component: CategoriasComponent
            },
            {
                path: "produtos",
                component: ProdutosComponent
            },
            {
                path: "conta-configuracoes",
                component: ContaConfiguracoesComponent
            },
            {
                path: "conta-compartilhar",
                component: ContaCompartilharComponent
            }
        ]
    },
    {
        path: "loja/:path_loja",
        component: LayoutLojaComponent,
        children: [
            {
                path: "",
                component: LojaComponent
            },
            {
                path: "categoria/:nome_categoria/:id_categoria",
                component: LojaCategoriaComponent
            },
            {
                path: "busca/:busca",
                component: LojaBuscaComponent
            },
            {
                path: "produto/:nome_produto/:id_produto",
                component: LojaProdutoComponent
            }
        ]
    },
];