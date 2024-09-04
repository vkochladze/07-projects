import * as Switch from '@radix-ui/react-switch';

interface SwitchInfo {
    onCheckedChange: () => void
    checked: boolean
}

const SwitchDemo = ({ checked, onCheckedChange }: SwitchInfo) => (
    <form>
        <div className="flex items-center">

            <Switch.Root
                className="w-[42px] h-[25px] bg-blackA6 rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
                id="airplane-mode"
                style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' } as React.CSSProperties}
                onCheckedChange={onCheckedChange}
                checked={checked}
            >
                <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
            <img src={checked ? '/dark.svg' : '/light.svg'} alt="" className='w-9 h-9' style={{ transform: 'translateX(184px)' }} />
        </div>
    </form>
);

export default SwitchDemo;
