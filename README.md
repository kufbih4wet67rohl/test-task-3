###Задача 3. Карточка облигации
Создать приложение по макету на основе React и Redux, которое реализует следующие функции:
 - получает данные об облигации из API по идентификатору облигации (ISIN) и отображает их на карточке,
 - позволяет выбрать период за который строится график,
 - позволяет изменить параметр, по которому строится график.

Комментарии к задаче
 - в качестве основы приложения рекомендуем использовать Create React App (https://github.com/facebook/create-react-app),
 - библиотеку для построения графика можно выбрать любую,
 - данные для графика можно сгенерировать случайным образом,
 - все спорные моменты решайте в пользу уменьшения времени на выполнения задания и упрощения кода.

Ожидаемое решение
 - код приложения на языке JavaScript в репозитории на GitHub.

----------------------------------------

Оценочное время 12-20 часов (с точностью не лучше 3-4 часов)
Фактическое время 18 час 30 мин (не включая это описание)
Субъективная сложность задачи 4-5

Команды (вполне стандартные) приведены ниже

Несколько комментариев:
 - Для отображения диаграм использован модуль [React-Vis](https://www.npmjs.com/package/react-vis) от Uber. Как мне позазалось, что он [даёт красивые диаграмы](https://uber.github.io/react-vis/examples/showcases/plots). Хотя есть и недостаток - в консоли браузера есть (жёлтое) предупреждение о переименовании метода componentWillReceiveProps в компоненте XYPlot - разработчики пока не освежили свой пакет в соответствии с последними веяниями.

 - Для получения данных используется мок arc/mocks/Http.js - тесты на этот мок я делать не стал, сочтя это избыточным, в реальном проекте его бы не было совсем.

 - Тесты можно было бы сделать более подробные, но счёл это избыточным для этого тестового задания.

 - В компоненте, как кажется, можно выделить две области - верхнюю с информацией об эмитенте и нижнюю с графиками котировок. Из макета мне показалось, что информация в верней части загружается один раз и далее не меняется. Если это так, то можно было бы разбить презентационный компонент bonds/CardView.jsx также на два - верхний и нижний. Тогда при изменении типа или периода котировок верхний компонент бы не перерисовывался. Но делать этого не стал чтобы не затягивать задачу. (Хотя намёк на это сделал разделив получение данных из сервиса на два метода).



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
