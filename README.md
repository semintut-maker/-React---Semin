Пункт 1:
Mantine используется – да, есть MantineProvider, компоненты Card, Button, Loader, Container и т.д.

Пункт 2:
 LaunchCard использует <Card shadow="sm" padding="md" radius="md" withBorder> – да.

Пункт 3 и 4: 
В коде fetchLaunchesByYear использует https://api.spacexdata.com/v3/launches?launch_year=2020. Но поскольку API недоступно, использовал  мок-файл. Из-за ошибки 522 используется локальный мок, но код готов к работе с реальным API. 

Пункт 5: 
Параметр launch_year=2020 передаётся, в мок-данных также отфильтровано по 2020 году.

Пункт 6: 
В LaunchCard используются links.mission_patch_small, mission_name, rocket_name. В ModalPortal используются links.mission_patch, mission_name, rocket_name, details. – да.

Пункт 7: 
В main.tsx есть <React.StrictMode> – да.

Пункт 8: 
Управление состоянием через useReducer в hooks/useSpaceXReducer.ts – да.

Пункт 9: 
Модальное окно реализовано через ReactDOM.createPortal – да.

Пункт 10:
Визуально соответствует макету (карточки, кнопки, модалка) – да.

Пункт 11: 
Типизация: есть types/launch.ts, все пропсы и состояние типизированы – да.

Пункт 12: 
Тесты написаны (5 тестов, прошли) – да.
