import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
    collapsed?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ collapsed = false }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className={cn(
                'w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-300',
                collapsed && 'justify-center px-0'
            )}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
            <div className="relative h-4 w-4">
                {/* Sun icon for dark mode (clicking will switch to light) */}
                <Sun
                    className={cn(
                        'absolute h-4 w-4 transition-all duration-500',
                        theme === 'dark'
                            ? 'rotate-0 scale-100 opacity-100'
                            : 'rotate-90 scale-0 opacity-0'
                    )}
                />
                {/* Moon icon for light mode (clicking will switch to dark) */}
                <Moon
                    className={cn(
                        'absolute h-4 w-4 transition-all duration-500',
                        theme === 'light'
                            ? 'rotate-0 scale-100 opacity-100'
                            : '-rotate-90 scale-0 opacity-0'
                    )}
                />
            </div>
            {!collapsed && (
                <span className="ml-2">
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </span>
            )}
        </Button>
    );
};
