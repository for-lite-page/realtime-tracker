import { observer } from "mobx-react-lite"; // Важно: импорт из lite-версии для хуков
import { useStores } from "./store/StoreContext";

export const Counter = observer(() => {
    const { mainStore } = useStores();

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>MobX Counter</h2>

            {/* Читаем данные напрямую */}
            <div style={{ fontSize: '24px', margin: '10px 0' }}>
                Значение: <strong>{mainStore.counter}</strong>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => mainStore.setCount(mainStore.counter + 1)}>
                    Увеличить (+1)
                </button>

                <button onClick={() => mainStore.setCount(0)}>
                    Сбросить
                </button>
            </div>
        </div>
    );
});