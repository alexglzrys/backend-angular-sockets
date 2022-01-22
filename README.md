## Configurar proyecto Express con TS

```
mkdir miProyecto
cd miProyecto
npm init -y
npm i express cors body-parser

touch index.ts

tsc --init
```

## habilitar las siguientes configuraciones en el archivos TS

```
"target": "es6",
"outDir": "dist/",   
```

## Ejecutar compilación y transpilación proyecto TS a JS

```
tsc -w
```

## Correr proyecto con node

```
nodemon dist
```

## Instalar paquete de declaraciones de módulo (Tipos Express)

```
npm i --save-dev @types/express
```
